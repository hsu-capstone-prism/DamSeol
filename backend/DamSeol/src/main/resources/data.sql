-- 카테고리 삽입 (자동 증가되는 `category_id` 제외)
INSERT INTO category (name) VALUES ('Phon');
INSERT INTO category (name) VALUES ('Alter');
INSERT INTO category (name) VALUES ('Add');

-- 서브카테고리 삽입 (자동 증가되는 `subcategory_id` 제외)
INSERT INTO subcategory (name, category_id)
VALUES
    ('Consonant', 1), -- 음운의 자음 (category_id 1은 'Phon')
    ('Vowel', 1),     -- 음운의 모음
    ('Combination', 1), -- 모음과 자음의 결합
    ('FinalSound', 1),  -- 음절의 끝소리
    ('VoicedAndUnvoiced', 1), -- 유성자음과 무성자음
    ('VowelHarmony', 2), -- 모음조화 (category_id 2는 'Alter')
    ('ConsonantAssimilation', 2), -- 자음동화
    ('ContractionAndElision', 2), -- 축약과 탈락
    ('GlottalizationAndSonorization', 2), -- 경음화와 유성음화
    ('Glottalization', 2), -- 격음화
    ('Palatalization', 2), -- 구개음화
    ('SAndNInsertion', 3); -- ㅅ과 ㄴ의 첨가 (category_id 3은 'Add')

-- 단어 삽입 (자동 증가되는 `word_id` 제외)
INSERT INTO word (text, word_pron, subcategory_id)
VALUES ('난로', '난:로', 1); -- 1은 'Consonant' 서브카테고리의 ID