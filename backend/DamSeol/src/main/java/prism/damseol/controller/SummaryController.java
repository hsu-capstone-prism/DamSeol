package prism.damseol.controller;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prism.damseol.service.ai.AiAnalysisService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/summarize")
public class SummaryController {

    private final AiAnalysisService aiAnalysisService;

    @Operation(summary = "단어 발음 분석 요약", description = "업로드된 단어 발음 데이터를 분석한 내용을 요약하여 정확도 및 피드백 정보를 저장합니다.")
    @PostMapping("/word")
    public JsonNode summarizeWord(@RequestParam("text") String text) {
        return aiAnalysisService.summarizeFeedback(text, "word");
    }

    @Operation(summary = "문장 발음 분석 요약", description = "업로드된 문장 발음 데이터를 분석한 내용을 요약하여 정확도 및 피드백 정보를 저장합니다.")
    @PostMapping("/sentence")
    public JsonNode summarizeSentence(@RequestParam("text") String text) {
        return aiAnalysisService.summarizeFeedback(text, "sentence");
    }
}