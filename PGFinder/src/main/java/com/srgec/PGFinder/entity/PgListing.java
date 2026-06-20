package com.srgec.PGFinder.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PgListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pgName;

    private String address;

    private String city;

    private Double latitude;

    private Double longitude;

    private Double rent;

    private String gender;

    private Integer roomsAvailable;

    private String imageUrl;

    private Long ownerId;
}
