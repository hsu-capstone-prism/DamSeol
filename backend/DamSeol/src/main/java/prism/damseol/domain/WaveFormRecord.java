package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class WaveFormRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "waveformrecord_id")
    private Long id;

    @Column(nullable = false, length = 512)
    private String filePath;

    @Column(nullable = false, length = 255)
    private String fileName;

    @Column(nullable = false)
    private LocalDateTime upload_at;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "waveFormRecord", cascade = CascadeType.ALL)
    private List<WordRecord> wordRecords = new ArrayList<>();

    @OneToMany(mappedBy = "waveFormRecord", cascade = CascadeType.ALL)
    private List<SentenceRecord> sentenceRecords = new ArrayList<>();
}