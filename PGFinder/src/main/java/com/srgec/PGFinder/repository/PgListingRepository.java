package com.srgec.PGFinder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.srgec.PGFinder.entity.PgListing;

public interface PgListingRepository extends JpaRepository<PgListing, Long> {

    List<PgListing> findByCityIgnoreCase(String city);
}