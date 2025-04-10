package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SentenceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sentencerecord_id")
    private Long id;

    @Column(nullable = false)
    private int correction;

    @Column(nullable = false)
    private int pitch_score;

    @Column(nullable = false)
    private int rhythm_score;

    @Column(length = 255)
    private String pron;

    @Column(nullable = false, length = 512)
    private String evaluation;

    @Column(nullable = false, length = 255)
    private String analysis;

    @Column(nullable = false)
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sentence_id")
    private Sentence sentence;


}