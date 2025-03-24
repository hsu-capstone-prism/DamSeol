package prism.damseol.service;

import java.util.ArrayList;
import java.util.List;

/**
 * 한글 발음 비교 서비스 클래스
 * 사용자가 입력한 발음과 올바른 발음을 비교하여 잘못된 발음을 찾아 출력한다.
 */
public class KoreanPronChecker {
    // 한글 초성(첫소리), 중성(가운데소리), 종성(끝소리) 목록 정의
    private static final String CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
    private static final String JUNG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
    private static final String JONG = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

    /**
     * 한글 음절을 초성, 중성, 종성으로 분해하는 메서드
     * @param ch 한글 문자
     * @return 초성, 중성, 종성 배열 (종성이 없는 경우 빈 문자열 반환)
     */
    public static String[] decomposeKorean(char ch) {
        if (ch < '\uAC00' || ch > '\uD7A3') return new String[]{String.valueOf(ch)};

        int base = ch - '\uAC00';
        int cho = base / (21 * 28);
        int jung = (base % (21 * 28)) / 28;
        int jong = base % 28;

        return new String[]{String.valueOf(CHO.charAt(cho)), String.valueOf(JUNG.charAt(jung)), jong == 0 ? "" : String.valueOf(JONG.charAt(jong))};
    }

    // 사용자의 발음을 올바른 발음과 비교하여 틀린 부분의 위치를 배열로 반환
    public static List<Integer> getIncorrectPronIndices(String correct, String userInput) {
        List<Integer> incorrectIndices = new ArrayList<>();

        for (int i = 0; i < correct.length(); i++) {
            if (correct.charAt(i) != userInput.charAt(i))
                incorrectIndices.add(i);
        }
        return incorrectIndices;
    }

    public static List<String> checkPronunciation(String correct, String userInput) {
        List<String> list = new ArrayList<>();

        for (int i = 0; i < correct.length(); i++) {
            String[] correctPhons = decomposeKorean(correct.charAt(i));
            String[] userPhons = decomposeKorean(userInput.charAt(i));

            for (int j = 0; j < correctPhons.length; j++) {
                if (!correctPhons[j].equals(userPhons[j])) {
                    list.add(correctPhons[j]);
                    System.out.println("잘못 발음한 부분: '" + correct.charAt(i) + "'에서 '" + correctPhons[j] + "' 대신 '" + userPhons[j] + "' 발음함");
                }
            }
        }
        return list;
    }
}
