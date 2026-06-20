package com.srgec.PGFinder.dto;

import lombok.Data;

@Data
public class PgRequestDTO {
    private String pgName;
    private String address;
    private String city;
    private Double latitude;
    private Double longitude;
    private Double rent;
    private String gender;
    private Integer roomsAvailable;
    private Long ownerId;
}