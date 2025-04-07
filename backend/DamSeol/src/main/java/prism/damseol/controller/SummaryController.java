package prism.damseol.controller;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prism.damseol.service.ai.AiAnalysisService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SummaryController {

    private final AiAnalysisService aiAnalysisService;

    @PostMapping("/summarize")
    public JsonNode summarize(@RequestParam("text") String text) {
        return aiAnalysisService.summarizeFeedback(text);
    }
}