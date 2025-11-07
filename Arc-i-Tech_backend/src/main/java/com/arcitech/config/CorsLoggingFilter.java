package com.arcitech.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsLoggingFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(CorsLoggingFilter.class);

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        logRequest(request);
        
        chain.doFilter(req, res);
        
        logResponse(response);
    }

    private void logRequest(HttpServletRequest request) {
        logger.debug("=== CORS Request Details ===");
        logger.debug("Method: {}", request.getMethod());
        logger.debug("URI: {}", request.getRequestURI());
        logger.debug("Origin: {}", request.getHeader("Origin"));
        logger.debug("Access-Control-Request-Method: {}", request.getHeader("Access-Control-Request-Method"));
        logger.debug("Access-Control-Request-Headers: {}", request.getHeader("Access-Control-Request-Headers"));
        
        Collections.list(request.getHeaderNames()).forEach(headerName ->
            logger.debug("Header - {}: {}", headerName, request.getHeader(headerName))
        );
    }

    private void logResponse(HttpServletResponse response) {
        logger.debug("=== CORS Response Details ===");
        logger.debug("Status: {}", response.getStatus());
        response.getHeaderNames().forEach(headerName ->
            logger.debug("Header - {}: {}", headerName, response.getHeader(headerName))
        );
    }
}