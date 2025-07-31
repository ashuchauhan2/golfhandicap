package com.ashuchauhan.golfhandicap.service;

import com.ashuchauhan.golfhandicap.model.Round;
import com.ashuchauhan.golfhandicap.repository.RoundRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HandicapService {

    private final RoundRepository roundRepository;

    public HandicapService(RoundRepository roundRepository) {
        this.roundRepository = roundRepository;
    }

    @Cacheable("handicap")
    public double calculateHandicap() {
        List<Round> rounds = roundRepository.findAll();

        if (rounds.isEmpty()) {
            return 0.0;
        }

        // Simplified handicap differential formula: (score - course rating) * 113 / slope
        double totalDifferential = rounds.stream()
                .mapToDouble(r -> (r.getScore() - r.getCourseRating()) * 113 / r.getSlopeRating())
                .average()
                .orElse(0.0);

        return Math.round(totalDifferential * 10.0) / 10.0;
    }

    @CacheEvict(value = "handicap", allEntries = true)
    public Round saveRound(Round round) {
        return roundRepository.save(round);
    }

    public Round getMostRecentRound() {
        return roundRepository.findTopByOrderByPlayedAtDesc();
    }
}