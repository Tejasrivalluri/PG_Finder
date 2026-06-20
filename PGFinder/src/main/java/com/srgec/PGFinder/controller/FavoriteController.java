package com.srgec.PGFinder.controller;
import com.srgec.PGFinder.entity.Favorite;
import com.srgec.PGFinder.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin("*")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @PostMapping("/add")
    public Favorite addFavorite(
            @RequestBody Favorite favorite) {

        return favoriteRepository.save(favorite);
    }

    @GetMapping("/{userId}")
    public List<Favorite> getFavorites(
            @PathVariable Long userId) {

        return favoriteRepository.findByUserId(userId);
    }
}