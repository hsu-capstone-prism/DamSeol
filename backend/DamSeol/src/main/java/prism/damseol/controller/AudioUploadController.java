package prism.damseol.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class AudioUploadController {

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadAudio(@RequestParam("audio") MultipartFile audioFile) {
        if (audioFile.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "파일이 없습니다."));
        }

        try {
            String fileName = audioFile.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, audioFile.getBytes());

            return ResponseEntity.ok(Map.of("message", "파일 업로드 성공", "fileName", fileName));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "파일 저장 실패"));
        }
    }
}