package prism.damseol;

import java.nio.charset.StandardCharsets;

public class UnicodeDecoder {
    public static void main(String[] args) {
        // 유니코드 이스케이프된 문자열
        String encoded = "\ud3c9\uac00: \ub098\uc068  \n\uc810\uc218: 2/5\uc810  \n\uc774\uc720: \ud53c\uce58 \ubcc0\ud654\uac00 \uc804\ubc18\uc801\uc73c\ub85c \ud06c\uace0 \uc77c\uad00\uc131\uc774 \ubd80\uc871\ud574\uc11c \uc790\uc5f0\uc2a4\ub7fd\uc9c0 \uc54a\uc544\uc694. \ud83d\ude15";

        // 변환하는 메서드 실행
        String decoded = new String(encoded.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);

        // 결과 출력
        System.out.println("🔹 변환된 문자열:");
        System.out.println(decoded);
    }
}