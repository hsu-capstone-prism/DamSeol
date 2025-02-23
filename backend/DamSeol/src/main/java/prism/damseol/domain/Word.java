package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Word")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wordId;

    @Column(nullable = false, length = 100)
    private String text;

    @Column(nullable = false, length = 50)
    private String wordPron;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subcategory;

    @OneToOne
    @JoinColumn(name = "file_id", nullable = false)
    private FileEntity file;
}