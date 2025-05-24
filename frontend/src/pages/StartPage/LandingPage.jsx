import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LandingPage.css";
import reportVideo from "../../assets/videos/report.mp4";
import scoreVideo from "../../assets/videos/score.mp4";
import gameVideo from "../../assets/videos/game.mp4";

const LandingPage = () => {
  const navigate = useNavigate();

  const [sectionVisible, setSectionVisible] = useState({
    section1: false,
    section2: false,
    section3: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".fade-section");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
          setSectionVisible((prev) => ({
            ...prev,
            [`section${index + 1}`]: true,
          }));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-container">
      {/* 히어로 섹션 유지 */}
      <div className="hero-section">
        <iframe
          src="https://my.spline.design/starterscenecopy-0DS3kDfOXZqtzGJNTUeVyWJh/"
          frameborder="0"
          width="100%"
          height="100%"
          title="3D Landing"
        ></iframe>
        <div className="hero-text">
          <h1>
            청각장애인을 위한 <br />
            언어 학습 플랫폼, <br />
            <span className="blue-text">담설(談說)</span>
          </h1>
          <p className="subtitle">
            더 나은 소통을 위한 혁신적인 학습 시스템을 만나보세요.
          </p>
          <div className="landing-button-group">
            <button className="start-button" onClick={() => navigate("/login")}>
              시작하기 →
            </button>
            <button
              className="detail-button"
              onClick={() => setIsModalOpen(true)}
            >
              자세히
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content upgraded-modal">
            <div className="modal-header">
              <h2>담설(談說)이란?</h2>
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>“담설(談說)”</strong>은{" "}
                <strong>‘서로의 말을 나누며 진심을 전하는 것’</strong>을
                뜻합니다.
              </p>
              <p>
                우리는 소리 없이도 마음을 전할 수 있다는 믿음으로,
                <br />
                청각장애인의 언어 학습을 <strong>
                  더 쉽고, 더 깊이 있게
                </strong>{" "}
                돕고자 합니다.
              </p>
              <p>
                말의 벽을 허물고, 세상과의 소통을 이어주는{" "}
                <strong>연결의 시작점</strong>
                <br />
                그것이 바로 <strong>담설</strong>이 추구하는 가치입니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 배경 및 필요성 - 첫 번째 카드 위에 위치 */}
      <div className="service-section-title">어떤 서비스 인가요?</div>

      <div className="section-container">
        {/* Section 1 */}
        <div
          className={`fade-section ${sectionVisible.section1 ? "visible" : ""}`}
        >
          <div className="card">
            <h3 className="card-title">청각장애인의 소통 문제와 한계</h3>
            <p className="card-text">
              <br />
              발음 정확도 및 어휘 사용 제한 <br />
              교육 및 직업의 소통 장벽 · 사회적 소외
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div
          className={`fade-section ${sectionVisible.section2 ? "visible" : ""}`}
        >
          <div className="card">
            <h3 className="card-title">기술적 접근을 통한 해결</h3>
            <p className="card-text">
              <br />
              AI 기반 발음 교정 <br />
              문장 표현 능력을 향상 <br />
              효과적인 소통을 지원
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div
          className={`fade-section ${sectionVisible.section3 ? "visible" : ""}`}
        >
          <div className="card">
            <h3 className="card-title">
              사회적 약자를 위한 <br />
              지속 가능한 지원
            </h3>
            <p className="card-text">
              자율 학습 환경 구축
              <br />
              지속 가능한 지원 & 사회적 통합
            </p>
          </div>
        </div>
      </div>

      {/* 기능 섹션 추가 */}
      <div className="feature-section-container">
        {/* 기능 섹션 제목 */}
        <div className="feature-title">어떤 기능이 있나요?</div>

        {/* 1. 학습 모듈 */}
        <div
          className={`feature-section feature-left ${
            sectionVisible.feature1 ? "emphasized" : ""
          }`}
        >
          <div className="feature-text">
            <h2>학습 모듈</h2>
            <p>
              파형 시각화, 입모양 제시, 정확도 분석을 통해 실시간으로 발음 교정을
              받을 수 있습니다.
            </p>
          </div>
          <div className="feature-placeholder">
            <video
              src={scoreVideo}
              width="100%"
              height="100%"
              muted
              autoPlay
              loop
              playsInline
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* 2. 학습 보고서 제공 */}
        <div
          className={`feature-section feature-right ${
            sectionVisible.feature2 ? "emphasized" : ""
          }`}
        >
          <div className="feature-text">
            <h2>학습 보고서 제공</h2>
            <p>
              사용자의 학습 데이터를 통계적으로 분석하여 학습 방향을 제시합니다.
            </p>
          </div>
          <div className="feature-placeholder">
            <video
              src={reportVideo}
              width="100%"
              height="100%"
              muted
              autoPlay
              loop
              playsInline
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* 3. 게임형 콘텐츠 */}
        <div
          className={`feature-section feature-left ${
            sectionVisible.feature3 ? "emphasized" : ""
          }`}
        >
          <div className="feature-text">
            <h2>게임형 콘텐츠</h2>
            <p>퀴즈와 퍼즐을 통해 학습한 내용을 재미있게 복습할 수 있습니다.</p>
          </div>
          <div className="feature-placeholder">
            {" "}
            <video
              src={gameVideo}
              width="100%"
              height="102%"
              muted
              autoPlay
              loop
              playsInline
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
