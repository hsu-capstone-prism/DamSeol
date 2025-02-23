package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    private String content;

    @OneToMany(mappedBy = "Member", cascade = CascadeType.ALL)
    private List<WordRecord> wordRecords = new ArrayList<>();

    @OneToMany(mappedBy = "Member", cascade = CascadeType.ALL)
    private List<SentenceRecord> sentenceRecords = new ArrayList<>();

    @ManyToMany(cascade=CascadeType.MERGE)
    @JoinTable(name="member_role",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles = new ArrayList<>();
}