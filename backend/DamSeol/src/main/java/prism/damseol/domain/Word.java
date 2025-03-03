package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Word {

    @Id @GeneratedValue
    @Column(name = "word_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String text;

    @Column(nullable = false, length = 50)
    private String wordPron;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private FileEntity file;

    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL)
    private List<WordRecord> wordRecords = new ArrayList<>();
}