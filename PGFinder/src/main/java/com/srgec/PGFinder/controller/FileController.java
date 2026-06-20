package com.srgec.PGFinder.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        String uploadDir = "uploads/";

        File dir = new File(uploadDir);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String path = uploadDir + file.getOriginalFilename();

        file.transferTo(new File(path));

        return ResponseEntity.ok(path);
    }
}