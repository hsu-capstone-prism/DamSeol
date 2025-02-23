package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subcategory {

    @Id @GeneratedValue
    @Column(name = "subcategory_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "Subcategory", cascade = CascadeType.ALL)
    private List<Word> words = new ArrayList<>();

    @OneToMany(mappedBy = "Subcategory", cascade = CascadeType.ALL)
    private List<Sentence> sentences = new ArrayList<>();
}