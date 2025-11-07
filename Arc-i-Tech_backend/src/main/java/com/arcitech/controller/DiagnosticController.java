package com.arcitech.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

@RestController
public class DiagnosticController {

    @GetMapping("/api/test/cors")
    public ResponseEntity<?> testCors() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "CORS is working correctly");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return ResponseEntity.ok(response);
    }
}