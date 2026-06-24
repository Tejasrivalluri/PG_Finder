package com.srgec.PGFinder.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srgec.PGFinder.dto.LoginRequestDTO;
import com.srgec.PGFinder.dto.LoginResponseDTO;
import com.srgec.PGFinder.dto.RegisterRequestDTO;
import com.srgec.PGFinder.entity.User;
import com.srgec.PGFinder.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO dto) {

        Optional<User> existingUser = userRepository.findByEmail(dto.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(dto.getRole() != null ? dto.getRole() : "USER")
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User Registered Successfully");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto) {

        Optional<User> userOpt = userRepository.findByEmail(dto.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid Email");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid Password");
        }

        LoginResponseDTO response = new LoginResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                "Login Successful"
        );

        return ResponseEntity.ok(response);
    }
}