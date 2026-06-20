package com.srgec.PGFinder.controller;
import com.srgec.PGFinder.entity.Review;
import com.srgec.PGFinder.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping("/add")
    public Review addReview(
            @RequestBody Review review) {

        return reviewRepository.save(review);
    }

    @GetMapping("/{pgId}")
    public List<Review> getReviews(
            @PathVariable Long pgId) {

        return reviewRepository.findByPgId(pgId);
    }
}