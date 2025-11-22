import React from 'react';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
            <h2 style={{fontSize:'24px', fontWeight:'900', letterSpacing:'1px', marginBottom:'20px'}}>CHILL</h2>
            <p style={{fontSize:'14px', color:'#aaa'}}>© 2023 Chill All Rights Reserved.</p>
        </div>
        
        <div className="footer-links">
            <div className="footer-column">
                <h4>Genre</h4>
                <a href="#">Aksi</a>
                <a href="#">Anak-anak</a>
                <a href="#">Anime</a>
                <a href="#">Britania</a>
            </div>
            <div className="footer-column">
                <h4>Bantuan</h4>
                <a href="#">FAQ</a>
                <a href="#">Kontak Kami</a>
                <a href="#">Privasi</a>
                <a href="#">Syarat & Ketentuan</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;