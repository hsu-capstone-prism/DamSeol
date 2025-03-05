package prism.damseol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import prism.damseol.domain.Word;
import prism.damseol.domain.Subcategory;
import prism.damseol.repository.WordRepository;
import prism.damseol.repository.SubcategoryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;
    private final SubcategoryRepository subcategoryRepository;

    // 서브카테고리 ID로 단어 목록 조회
    public List<Word> getWordsBySubcategory(Long subcategoryId) {
        Subcategory subcategory = subcategoryRepository.findById(subcategoryId)
                .orElseThrow(() -> new IllegalArgumentException("해당 서브카테고리가 존재하지 않습니다: " + subcategoryId));

        return wordRepository.findBySubcategory(subcategory);
    }
}