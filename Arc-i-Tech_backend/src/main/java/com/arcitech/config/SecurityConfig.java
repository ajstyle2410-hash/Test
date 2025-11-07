package com.arcitech.config;

import com.arcitech.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CustomUserDetailsService customUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        var provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(customUserDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Enable CORS and disable CSRF
            .cors(cors -> cors.configure(http)) // This uses the corsFilter bean
            .csrf(csrf -> csrf.disable())
            // Use stateless session as we're using JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Configure security headers
            .headers(headers -> headers
                .frameOptions(frame -> frame.sameOrigin())
                .cacheControl(cache -> cache.disable()))
            // Configure exception handling
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint((request, response, ex) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json;charset=UTF-8");
                    response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"" + ex.getMessage() + "\"}");
                }))
            .authorizeHttpRequests(auth -> auth
                // Allow CORS preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // ✅ PUBLIC ROUTES
                .requestMatchers(
                    "/api/auth/register",
                    "/api/auth/login",
                    "/api/auth/refresh",
                    "/api/test/cors",  // Allow access to the CORS test endpoint
                    "/public/**",
                    "/", "/index.html", "/favicon.ico",
                    "/css/**", "/js/**", "/images/**"
                ).permitAll()

                // ✅ SUPER ADMIN ROUTES
                .requestMatchers("/api/admin/**").hasRole("SUPER_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("SUPER_ADMIN")
                
                // ✅ ADMIN ROUTES (SUPER_ADMIN and SUB_ADMIN)
                .requestMatchers("/api/management/**")
                    .hasAnyRole("SUPER_ADMIN", "SUB_ADMIN")
                
                // ✅ DEVELOPER ROUTES
                .requestMatchers("/api/developer/**").hasRole("DEVELOPER")
                
                // ✅ PROTECTED ROUTES (All authenticated users)
                .requestMatchers("/api/projects/**").authenticated()
                .requestMatchers("/api/notifications/**").authenticated()
                .requestMatchers("/api/inquiries/**").authenticated()
                .requestMatchers("/api/profile/**").authenticated()
                
                // Require authentication for any other request
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
