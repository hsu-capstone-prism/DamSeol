package prism.damseol.service.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AiAnalysisService {

    private final RestTemplate restTemplate = new RestTemplate(); // 간단히 사용
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON 파싱용

    public JsonNode analyzeSentence(MultipartFile audioFile, String sentenceText) throws IOException {
        String url = "http://127.0.0.1:5000/upload-audio";

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new MultipartInputStreamFileResource(audioFile.getInputStream(), audioFile.getOriginalFilename()));
        body.add("mode", "sentence");
        body.add("text", sentenceText);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return objectMapper.readTree(response.getBody());
        } else {
            throw new RuntimeException("AI 서버 통신 실패: " + response.getStatusCode());
        }
    }
}