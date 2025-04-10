package prism.damseol.controller;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prism.damseol.service.ai.AiAnalysisService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/summarize")
public class SummaryController {

    private final AiAnalysisService aiAnalysisService;

    @PostMapping("/sentence")
    public JsonNode summarizeSentence(@RequestParam("text") String text) {
        return aiAnalysisService.summarizeFeedback(text, "sentence");
    }

    @PostMapping("/word")
    public JsonNode summarizeWord(@RequestParam("text") String text) {
        return aiAnalysisService.summarizeFeedback(text, "word");
    }
}