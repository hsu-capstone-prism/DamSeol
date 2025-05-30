package prism.damseol.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images") // API 요청이 /api로 시작하도록 설정
public class ImageController {

    private final String WAVEFORM_DIR = System.getProperty("user.dir") + "/uploads/waveform/";
    private final String PITCH_DIR = System.getProperty("user.dir") + "/uploads/pitch/";

    @Operation(summary = "Waveform 이미지 조회", description = "지정된 파일 이름의 발음 wave 파형 이미지를 반환합니다.")
    @GetMapping("/waveform/{filename}")
    public ResponseEntity<Resource> getWaveformImage(@PathVariable String filename) {
        return serveImage(WAVEFORM_DIR, filename);
    }

    @Operation(summary = "Pitch 이미지 조회", description = "지정된 파일 이름의 pitch 이미지를 반환합니다.")
    @GetMapping("/pitch/{filename}")
    public ResponseEntity<Resource> getPitchImage(@PathVariable String filename) {
        return serveImage(PITCH_DIR, filename);
    }

    private ResponseEntity<Resource> serveImage(String directory, String filename) {
        try {
            Path filePath = Paths.get(directory).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG) // PNG 이미지 타입 지정
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}