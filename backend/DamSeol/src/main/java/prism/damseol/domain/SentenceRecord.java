package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class SentenceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sentencerecord_id")
    private Long id;

    @Column(nullable = false)
    private double score;

    @Column(nullable = false, columnDefinition = "JSON")
    private String details;

    @Column(nullable = false)
    private int timeSpent;

    @Column(nullable = false)
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "waveformrecord_id")
    private WaveFormRecord waveFormRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sentence_id")
    private Sentence sentence;
}