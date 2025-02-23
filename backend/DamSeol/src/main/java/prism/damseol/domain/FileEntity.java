package prism.damseol.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "File")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    @Column(nullable = false, length = 512)
    private String filePath;

    @Column(nullable = false, length = 50)
    private String fileType;

    @Column(nullable = false, length = 255)
    private String fileName;

    @Column(nullable = false)
    private LocalDateTime uploadDate;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}