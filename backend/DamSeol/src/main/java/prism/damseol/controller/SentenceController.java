package prism.damseol.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prism.damseol.dto.SentenceDTO;
import prism.damseol.service.SentenceService;
import java.util.List;

@RestController
@RequestMapping("/api/sentences")
@RequiredArgsConstructor
public class SentenceController {

    private final SentenceService sentenceService;

    @Operation(summary = "서브카테고리별 문장 조회", description = "지정된 서브카테고리에 포함된 문장 리스트를 반환합니다.")
    @GetMapping("/subcategory/{subcategoryId}")
    public List<SentenceDTO> getSentencesBySubcategory(@PathVariable("subcategoryId") Long subcategoryId) {
        return sentenceService.getSentencesBySubcategory(subcategoryId);
    }
}
