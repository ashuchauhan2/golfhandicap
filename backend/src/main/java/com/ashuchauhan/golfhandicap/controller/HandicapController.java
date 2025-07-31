package com.ashuchauhan.golfhandicap.controller;

import com.ashuchauhan.golfhandicap.model.Round;
import com.ashuchauhan.golfhandicap.service.HandicapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class HandicapController {

    private final HandicapService handicapService;

    public HandicapController(HandicapService handicapService) {
        this.handicapService = handicapService;
    }

    @PostMapping("/rounds")
    public ResponseEntity<Round> addRound(@RequestBody Round round) {
        Round saved = handicapService.saveRound(round);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/handicap")
    public ResponseEntity<Double> getHandicap() {
        double handicap = handicapService.calculateHandicap();
        return ResponseEntity.ok(handicap);
    }
}