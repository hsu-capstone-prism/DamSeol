package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Sentence")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sentence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sentenceId;

    @Column(nullable = false, length = 255)
    private String text;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subcategory;
}