package com.srgec.PGFinder.repository;
import com.srgec.PGFinder.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository
        extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserId(Long userId);

}