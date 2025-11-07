package com.arcitech.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    /**
     * Store a file and return its URL
     * @param file The file to store
     * @return The URL where the file can be accessed
     */
    String store(MultipartFile file);
}