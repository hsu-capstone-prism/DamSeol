package prism.damseol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import prism.damseol.domain.*;
import prism.damseol.repository.*;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final MemberRepository memberRepository;
    private final WordRecordRepository wordRecordRepository;
    private final SentenceRecordRepository sentenceRecordRepository;

//    public List<WordRecordDTO> getWordRecordsByMember(String memberName) {
//        Member member = memberRepository.findByName(memberName)
//                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
//
//        return wordRecordRepository.findAllByMember(member)
//                .stream()
//                .map(WordRecordDTO::new)
//                .toList();
//    }
//
//    public List<SentenceRecordDTO> getSentenceRecordsByMember(String memberName) {
//        Member member = memberRepository.findByName(memberName)
//                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
//
//        return sentenceRecordRepository.findAllByMember(member)
//                .stream()
//                .map(SentenceRecordDTO::new)
//                .toList();
//    }
}