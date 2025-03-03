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
public class LipShape3D {

    @Id @GeneratedValue
    @Column(name = "lipshape3d_id")
    private Long id;

    @Column(nullable = false, length = 512)
    private String filePath;

    @Column(nullable = false, length = 255)
    private String fileName;

    @OneToMany(mappedBy = "lipShape3d", cascade = CascadeType.ALL)
    private List<Word> words = new ArrayList<>();
}