package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameScenario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gamescenario_id")
    private Long id;

    private String videoFileName;

    private String situation;

    @ElementCollection
    @CollectionTable(name = "gamescenario_choices", joinColumns = @JoinColumn(name = "scenario_id"))
    private List<Choice> choices;
}