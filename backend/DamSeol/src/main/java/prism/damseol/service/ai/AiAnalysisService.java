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

    public JsonNode analyzeWord(MultipartFile audioFile, String wordPron) throws IOException {
        String url = "http://127.0.0.1:5000/upload-audio";

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new MultipartInputStreamFileResource(audioFile.getInputStream(), audioFile.getOriginalFilename()));
        body.add("mode", "word");
        body.add("text", wordPron);

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

    public JsonNode summarizeFeedback(String text) {
        String url = "http://127.0.0.1:5000/feedback";

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("mode", "sentence");
        body.add("text", text);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                return objectMapper.readTree(response.getBody());
            } catch (IOException e) {
                throw new RuntimeException("JSON 파싱 실패", e);
            }
        } else {
            throw new RuntimeException("요약 요청 실패: " + response.getStatusCode());
        }
    }
}