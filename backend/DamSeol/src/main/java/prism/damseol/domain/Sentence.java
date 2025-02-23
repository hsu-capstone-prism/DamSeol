package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sentence {

    @Id @GeneratedValue
    @Column(name = "sentence_id")
    private Long id;

    @Column(nullable = false)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;

    @OneToMany(mappedBy = "Sentence", cascade = CascadeType.ALL)
    private List<SentenceRecord> sentenceRecords = new ArrayList<>();
}