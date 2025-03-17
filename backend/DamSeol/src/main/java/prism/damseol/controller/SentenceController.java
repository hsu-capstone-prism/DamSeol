package prism.damseol.controller;

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

    // 서브카테고리 ID로 문장 목록 조회
    @GetMapping("/subcategory/{subcategoryId}")
    public List<SentenceDTO> getSentencesBySubcategory(@PathVariable("subcategoryId") Long subcategoryId) {
        return sentenceService.getSentencesBySubcategory(subcategoryId);
    }
}
