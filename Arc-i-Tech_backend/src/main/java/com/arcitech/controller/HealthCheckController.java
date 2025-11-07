package com.arcitech.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class HealthCheckController {
    
    private static final Logger logger = LoggerFactory.getLogger(HealthCheckController.class);

    @GetMapping("/api/health")
    public String healthCheck() {
        logger.info("Health check endpoint called");
        return "{\"status\": \"UP\", \"message\": \"Server is running\"}";
    }
}