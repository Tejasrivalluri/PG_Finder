package com.srgec.PGFinder.controller;
import com.srgec.PGFinder.entity.Owner;
import com.srgec.PGFinder.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owners")
@CrossOrigin("*")
public class OwnerController {

    @Autowired
    private OwnerRepository ownerRepository;

    @PostMapping("/add")
    public Owner addOwner(
            @RequestBody Owner owner) {

        return ownerRepository.save(owner);
    }

    @GetMapping("/all")
    public List<Owner> getAllOwners() {

        return ownerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Owner getOwnerById(
            @PathVariable Long id) {

        return ownerRepository.findById(id)
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public String deleteOwner(
            @PathVariable Long id) {

        ownerRepository.deleteById(id);

        return "Owner Deleted Successfully";
    }

}
