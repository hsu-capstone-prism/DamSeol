package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class LipShape {

    @Id @GeneratedValue
    @Column(name = "lipshape_id")
    private Long id;

    @Column(nullable = false, length = 512)
    private String filePath;

    @Column(nullable = false, length = 255)
    private String fileName;

    @OneToMany(mappedBy = "lipShape", cascade = CascadeType.ALL)
    private List<Word> words = new ArrayList<>();
}