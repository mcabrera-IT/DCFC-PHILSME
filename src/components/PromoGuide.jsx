import React, { useState, useEffect, useRef } from 'react';
import RegistrationModal from './RegistrationModal';

export default function PromoGuide() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialsClicked, setSocialsClicked] = useState({ fb: false, ig: false, tiktok: false, linkedin: false });
  const stepRefs = useRef([]);

  const isAllSocialsClicked = socialsClicked.fb && socialsClicked.ig && socialsClicked.tiktok && socialsClicked.linkedin;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const isMobile = window.innerWidth <= 768;

      entries.forEach(entry => {
        if (isMobile && entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    });

    stepRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="promo">
      <div className="container">
        <h2 className="section-title">
          Connect, Play, and <span style={{ color: '#FF1616' }}>WIN</span><br />with DISCOVERY!
        </h2>

        <div className="steps-grid">
          <div className="step-card" ref={(el) => stepRefs.current[0] = el}>
            <span className="step-number">01</span>
            <h3>FOLLOW US</h3>
            <p>Like and follow our official Facebook, Instagram, TikTok, and LinkedIn accounts to unlock registration.</p>
            <div className="step-actions split-actions">
              <a
                href="https://www.facebook.com/discoverycfc/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setSocialsClicked(s => ({ ...s, fb: true }))}
                className={`btn d-inline-flex justify-content-center align-items-center gap-2 ${socialsClicked.fb ? 'btn-outline-danger active' : 'btn-outline-danger'}`}
                style={{ flex: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"></path>
                </svg>
                FACEBOOK
              </a>
              <a
                href="https://www.instagram.com/discoverycfc"
                target="_blank"
                rel="noreferrer"
                onClick={() => setSocialsClicked(s => ({ ...s, ig: true }))}
                className={`btn d-inline-flex justify-content-center align-items-center gap-2 ${socialsClicked.ig ? 'btn-outline-danger active' : 'btn-outline-danger'}`}
                style={{ flex: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
                INSTAGRAM
              </a>
            </div>
            <div className="step-actions mt-2 split-actions" style={{ marginTop: '0.8rem' }}>
              <a
                href="https://www.tiktok.com/@discoverycfc"
                target="_blank"
                rel="noreferrer"
                onClick={() => setSocialsClicked(s => ({ ...s, tiktok: true }))}
                className={`btn d-inline-flex justify-content-center align-items-center gap-2 full-width ${socialsClicked.tiktok ? 'btn-outline-danger active' : 'btn-outline-danger'}`}
                style={{ flex: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2.81c-1.206 0-2.4-.412-3.324-1.118A4.9 4.9 0 0 1 10.08 4v7.712A4.14 4.14 0 0 1 5.94 15.85A4.14 4.14 0 0 1 1.8 11.71a4.14 4.14 0 0 1 4.14-4.141c.01 0 .02 0 .02.001v2.8a1.34 1.34 0 1 0 1.36 1.34V0z" />
                </svg>
                TIKTOK
              </a>
              <a
                href="https://www.linkedin.com/company/discoverycfc"
                target="_blank"
                rel="noreferrer"
                onClick={() => setSocialsClicked(s => ({ ...s, linkedin: true }))}
                className={`btn d-inline-flex justify-content-center align-items-center gap-2 full-width ${socialsClicked.linkedin ? 'btn-outline-danger active' : 'btn-outline-danger'}`}
                style={{ flex: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S1.2 3.226 1.2 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
                LINKEDIN
              </a>
            </div>
          </div>

          <div className="step-card" ref={(el) => stepRefs.current[1] = el}>
            <span className="step-number">02</span>
            <h3>REGISTER</h3>
            <p>Register via the link and complete the form to get started.</p>
            <div className="step-actions">
              <button
                type="button"
                onClick={() => isAllSocialsClicked && setIsModalOpen(true)}
                className={`btn full-width ${isAllSocialsClicked ? 'btn-outline-danger btn-accent' : 'btn-outline-danger'}`}
                disabled={!isAllSocialsClicked}
                style={{
                  cursor: isAllSocialsClicked ? 'pointer' : 'not-allowed',
                  width: '100%'
                }}
              >
                {isAllSocialsClicked ? 'REGISTER NOW' : 'COMPLETE THE FIRST STEP TO PROCEED'}
              </button>
            </div>
          </div>

          <div className="step-card" ref={(el) => stepRefs.current[2] = el}>
            <span className="step-number">03</span>
            <h3>PLAY & WIN</h3>
            <p>Present your proof to our booth representative and claim your chance to play!</p>
            <div className="step-actions">
              <button type="button" className="btn full-width" style={{ backgroundColor: '#FFD600', color: '#0D0D0D', fontWeight: 'bold', width: '100%' }}>READY, SET, DROP!</button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Modal popup */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
