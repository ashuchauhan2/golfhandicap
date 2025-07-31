package com.ashuchauhan.golfhandicap.repository;

import com.ashuchauhan.golfhandicap.model.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    Round findTopByOrderByPlayedAtDesc();
}