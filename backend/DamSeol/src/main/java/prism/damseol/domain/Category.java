package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @OneToMany(mappedBy = "Category", cascade = CascadeType.ALL)
    private List<Subcategory> subcategories = new ArrayList<>();

    @OneToMany(mappedBy = "Category", cascade = CascadeType.ALL)
    private List<Word> words = new ArrayList<>();

    @OneToMany(mappedBy = "Category", cascade = CascadeType.ALL)
    private List<Sentence> sentences = new ArrayList<>();
}