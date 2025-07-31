package com.ashuchauhan.golfhandicap.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Round {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int score;
    private double courseRating;
    private int slopeRating;
    private LocalDateTime playedAt;

    public Round() {}

    public Round(int score, double courseRating, int slopeRating, LocalDateTime playedAt) {
        this.score = score;
        this.courseRating = courseRating;
        this.slopeRating = slopeRating;
        this.playedAt = playedAt;
    }

    // Getters and setters

    public Long getId() { return id; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public double getCourseRating() { return courseRating; }
    public void setCourseRating(double courseRating) { this.courseRating = courseRating; }

    public int getSlopeRating() { return slopeRating; }
    public void setSlopeRating(int slopeRating) { this.slopeRating = slopeRating; }

    public LocalDateTime getPlayedAt() { return playedAt; }
    public void setPlayedAt(LocalDateTime playedAt) { this.playedAt = playedAt; }
}