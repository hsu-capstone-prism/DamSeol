package prism.damseol.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 한글 발음 비교 서비스 클래스
 * 사용자가 입력한 발음과 올바른 발음을 비교하여 잘못된 발음을 찾아 출력한다.
 */
public class KoreanPronunciationUtils {
    // 한글 초성(첫소리), 중성(가운데소리), 종성(끝소리) 목록 정의
    private static final String CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
    private static final String JUNG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
    private static final String JONG = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
    // 종성 발음 변환 맵
    private static final Map<String, String> JONG_PRON_MAP = Map.ofEntries(
            Map.entry("ㄱ", "ㄱ"), Map.entry("ㄲ", "ㄱ"), Map.entry("ㅋ", "ㄱ"),
            Map.entry("ㄴ", "ㄴ"),
            Map.entry("ㄷ", "ㄷ"), Map.entry("ㅅ", "ㄷ"), Map.entry("ㅆ", "ㄷ"), Map.entry("ㅈ", "ㄷ"),
            Map.entry("ㅊ", "ㄷ"), Map.entry("ㅌ", "ㄷ"), Map.entry("ㅎ", "ㄷ"),
            Map.entry("ㄹ", "ㄹ"),
            Map.entry("ㅁ", "ㅁ"),
            Map.entry("ㅂ", "ㅂ"), Map.entry("ㅍ", "ㅂ"),
            Map.entry("ㅇ", "ㅇ"),
            Map.entry("ㄳ", "ㄱ"), Map.entry("ㄵ", "ㄴ"), Map.entry("ㄶ", "ㄴ"),
            Map.entry("ㄺ", "ㄱ"), Map.entry("ㄻ", "ㅁ"), Map.entry("ㄼ", "ㅂ"),
            Map.entry("ㄽ", "ㄹ"), Map.entry("ㄾ", "ㄹ"), Map.entry("ㄿ", "ㅂ"),
            Map.entry("ㅀ", "ㄹ"), Map.entry("ㅄ", "ㅂ")
    );

    // 발음 비교 시 종성 변환
    private static String normalizeJong(String jong) {
        return JONG_PRON_MAP.getOrDefault(jong, jong);
    }

    // 한글 음절을 초성, 중성, 종성으로 분해하는 메서드
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

        int correctIndex = 0, userIndex = 0;

        while (userIndex < userInput.length() && correctIndex < correct.length()) {
            char correctChar = correct.charAt(correctIndex);
            char userChar = userInput.charAt(userIndex);

            if (Character.isWhitespace(correctChar) || !Character.isLetterOrDigit(correctChar)) {
                correctIndex++; // 공백 및 문장부호 건너뛰기
                continue;
            } else if (Character.isWhitespace(userChar) || !Character.isLetterOrDigit(userChar)) {
                userIndex++;
                continue;
            }

            if (correctChar != userChar) {
                incorrectIndices.add(userIndex);
            }

            correctIndex++;
            userIndex++;
        }

        return incorrectIndices;
    }

    public static List<String> checkPronunciation(String correct, String userInput) {
        List<String> list = new ArrayList<>();
        int correctIndex = 0, userIndex = 0;

        while (userIndex < userInput.length() && correctIndex < correct.length()) {
            char correctChar = correct.charAt(correctIndex);
            char userChar = userInput.charAt(userIndex);

            if (Character.isWhitespace(correctChar) || !Character.isLetterOrDigit(correctChar)) {
                correctIndex++; // 공백 및 문장부호 건너뛰기
                continue;
            } else if (Character.isWhitespace(userChar) || !Character.isLetterOrDigit(userChar)) {
                userIndex++;
                continue;
            }

            String[] correctPhons = decomposeKorean(correctChar);
            String[] userPhons = decomposeKorean(userChar);

            for (int j = 0; j < correctPhons.length; j++) {
                String correctPhon = correctPhons[j];
                String userPhon = userPhons[j];

                // 종성일 경우, 발음이 같다면 틀린 것으로 간주하지 않음
                if (j == 2) {
                    correctPhon = normalizeJong(correctPhon);
                    userPhon = normalizeJong(userPhon);
                }

                if (!correctPhon.equals(userPhon) && !list.contains(correctPhon)
                        && !correctPhon.isEmpty())
                    list.add(correctPhon);
            }
            correctIndex++;
            userIndex++;
        }
        return list;
    }
}
