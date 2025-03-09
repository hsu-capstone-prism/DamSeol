package prism.damseol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import prism.damseol.domain.Subcategory;
import prism.damseol.dto.SentenceDTO;
import prism.damseol.repository.SentenceRepository;
import prism.damseol.repository.SubcategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SentenceService {

    private final SentenceRepository sentenceRepository;
    private final SubcategoryRepository subcategoryRepository;

    // 서브카테고리 ID로 단어 목록 조회
    public List<SentenceDTO> getSentencesBySubcategory(Long subcategoryId) {
        Subcategory subcategory = subcategoryRepository.findById(subcategoryId)
                .orElseThrow(() -> new IllegalArgumentException("해당 서브카테고리가 존재하지 않습니다: " + subcategoryId));

        return sentenceRepository.findBySubcategory(subcategory)
                .stream()
                .map(SentenceDTO::new)
                .collect(Collectors.toList());
    }
}
