package com.arcitech.controller;

import com.arcitech.dto.LoginRequest;
import com.arcitech.dto.LoginResponse;
import com.arcitech.dto.RegisterRequest;
import com.arcitech.model.User;
import com.arcitech.repository.UserRepository;
import com.arcitech.security.JwtUtils;
import com.arcitech.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils,
                          UserService userService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        String token = jwtUtils.generateJwtToken(auth);
        var principal = (org.springframework.security.core.userdetails.User) auth.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).orElseThrow();

        return ResponseEntity.ok(new LoginResponse(
                token,
                "Bearer",
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole().name()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest req) {
        User newUser = userService.register(
                req.getFullName(),
                req.getEmail(),
                req.getPassword(),
                req.getProgramType()
        );
        return ResponseEntity.ok(newUser);
    }
}
