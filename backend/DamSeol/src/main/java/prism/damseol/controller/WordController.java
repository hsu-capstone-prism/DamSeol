package prism.damseol.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prism.damseol.domain.Word;
import prism.damseol.service.WordService;

import java.util.List;

@RestController
@RequestMapping("/api/words")
@RequiredArgsConstructor
public class WordController {

    private final WordService wordService;

    // 서브카테고리 ID로 단어 목록 조회
    @GetMapping("/subcategory/{subcategoryId}")
    public List<Word> getWordsBySubcategory(@PathVariable Long subcategoryId) {
        return wordService.getWordsBySubcategory(subcategoryId);
    }
}