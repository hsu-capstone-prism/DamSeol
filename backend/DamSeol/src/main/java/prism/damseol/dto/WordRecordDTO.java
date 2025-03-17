package prism.damseol.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class WordRecordDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wordrecord_id")
    private Long id;

    @Column(nullable = false)
    private int score;

    @Column(length = 50)
    private String wrongPhon;

    @Column(nullable = false, length = 512)
    private String details;

    @Column(nullable = false)
    private LocalDateTime date;
}
