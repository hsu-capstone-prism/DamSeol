package prism.damseol.util;

import java.util.ArrayList;
import java.util.List;

/**
 * 한글 발음 비교 서비스 클래스
 * 사용자가 입력한 발음과 올바른 발음을 비교하여 잘못된 발음을 찾아 출력한다.
 */
public class KoreanPronunciationUtils {
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

            // for (int j = 0; j < Math.max(correctPhons.length, userPhons.length); j++) {
            for (int j = 0; j < correctPhons.length; j++) {
//                String correctPhon = j < correctPhons.length ? correctPhons[j] : "";
//                String userPhon = j < userPhons.length ? userPhons[j] : "";

                String correctPhon = correctPhons[j];
                String userPhon = userPhons[j];

                if (!correctPhon.equals(userPhon)) {
                    list.add(correctPhon);
                    System.out.println("잘못 발음한 부분: '" + correctChar + "'에서 '" + correctPhon + "' 대신 '" + userPhon + "' 발음함");
                }
            }
            correctIndex++;
            userIndex++;
        }
        return list;
    }
}
