package com.srgec.PGFinder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String message;
}