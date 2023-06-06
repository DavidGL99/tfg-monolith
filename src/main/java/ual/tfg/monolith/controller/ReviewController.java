package ual.tfg.monolith.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ual.tfg.monolith.dto.ReviewRequestDto;
import ual.tfg.monolith.service.ReviewService;
import ual.tfg.monolith.service.UserService;

@RestController
@RequestMapping("/review")
@CrossOrigin(allowedHeaders = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;

    @PostMapping("/save")
    private ResponseEntity saveReview(@RequestBody ReviewRequestDto review, @RequestHeader("Authorization") String token) {
        if (!userService.validate(token.split("Bearer")[1])) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(reviewService.save(review));
    }

    @GetMapping("/id/{id}")
    private ResponseEntity getReview(@PathVariable("id") Long id){
        return ResponseEntity.ok(reviewService.findById(id));
    }

    @GetMapping("/best")
    private ResponseEntity getBestReviews(){
        return ResponseEntity.ok(reviewService.bestReviewed());
    }
}
