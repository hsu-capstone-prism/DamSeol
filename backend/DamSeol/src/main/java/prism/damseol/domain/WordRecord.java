package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "WordRecord")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WordRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wordRecordId;

    @Column(nullable = false)
    private double score;

    @Column(nullable = false, columnDefinition = "JSON")
    private String details;

    @Column(nullable = false)
    private int timeSpent;

    @Column(nullable = false)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "file_id", nullable = false)
    private FileEntity file;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "word_id", nullable = false)
    private Word word;
}