package prism.damseol.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prism.damseol.dto.WordDTO;
import prism.damseol.service.WordService;

import java.util.List;

@RestController
@RequestMapping("/api/words")
@RequiredArgsConstructor
public class WordController {

    private final WordService wordService;

    @Operation(summary = "서브카테고리별 단어 조회", description = "지정된 서브카테고리에 포함된 단어 리스트를 반환합니다.")
    @GetMapping("/subcategory/{subcategoryId}")
    public List<WordDTO> getWordsBySubcategory(@PathVariable("subcategoryId") Long subcategoryId) {
        return wordService.getWordsBySubcategory(subcategoryId);
    }
}
