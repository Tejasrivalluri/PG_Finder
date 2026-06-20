package com.srgec.PGFinder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srgec.PGFinder.dto.PgRequestDTO;
import com.srgec.PGFinder.entity.PgListing;
import com.srgec.PGFinder.repository.PgListingRepository;

@RestController
@RequestMapping("/api/pgs")
@CrossOrigin(origins = "http://localhost:5173")
public class PgController {

    @Autowired
    private PgListingRepository pgRepository;

    // ✅ 1. ADD PG
    @PostMapping
    public PgListing addPg(@RequestBody PgRequestDTO dto) {

        PgListing pg = PgListing.builder()
                .pgName(dto.getPgName())
                .address(dto.getAddress())
                .city(dto.getCity())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .rent(dto.getRent())
                .gender(dto.getGender())
                .roomsAvailable(dto.getRoomsAvailable())
                .ownerId(dto.getOwnerId())
                .build();

        return pgRepository.save(pg);
    }

    // ✅ 2. GET ALL PGs
    @GetMapping
    public List<PgListing> getAllPgs() {
        return pgRepository.findAll();
    }

    // ✅ 3. GET PG BY ID
    @GetMapping("/{id}")
    public PgListing getPgById(@PathVariable Long id) {
        return pgRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PG not found"));
    }

    // ✅ 4. GET PGs BY CITY
    @GetMapping("/city/{city}")
    public List<PgListing> getByCity(@PathVariable String city) {
        return pgRepository.findByCityIgnoreCase(city);
    }

    // ✅ 5. GET PGs BY OWNER
    @GetMapping("/owner/{ownerId}")
    public List<PgListing> getByOwnerId(@PathVariable Long ownerId) {
        // Find all isn't ideal but we don't have a findByOwnerId method yet, so we filter it here for simplicity
        return pgRepository.findAll().stream()
                .filter(pg -> ownerId.equals(pg.getOwnerId()))
                .toList();
    }

    // ✅ 6. UPDATE PG
    @org.springframework.web.bind.annotation.PutMapping("/{id}")
    public PgListing updatePg(@PathVariable Long id, @RequestBody PgRequestDTO dto) {
        PgListing pg = pgRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PG not found"));
        
        pg.setPgName(dto.getPgName());
        pg.setAddress(dto.getAddress());
        pg.setCity(dto.getCity());
        pg.setRent(dto.getRent());
        pg.setGender(dto.getGender());
        pg.setRoomsAvailable(dto.getRoomsAvailable());
        // ownerId remains unchanged

        return pgRepository.save(pg);
    }

    // ✅ 7. DELETE PG
    @org.springframework.web.bind.annotation.DeleteMapping("/{id}")
    public void deletePg(@PathVariable Long id) {
        pgRepository.deleteById(id);
    }
}