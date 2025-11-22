import React, { useState } from 'react'; // <--- Import useState
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  // LOGIC SAKLAR MENU (Buka/Tutup)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- DATA FILM ---
  const continueWatchingData = [
    { id: 101, title: "Don't Look Up", rating: "4.5/5", poster: "/images/wide-dont-look-up.png" },
    { id: 102, title: "Blue Lock", rating: "4.2/5", poster: "/images/wide-blue-lock.jpg" },
    { id: 103, title: "A Man Called Otto", rating: "4.0/5", poster: "/images/wide-otto.jpg" },
  ];

  const trendingMovies = [
    { id: 1, title: "Duty After School", poster: "/images/duty-after-school.jpg" },
    { id: 2, title: "Sonic 2", poster: "/images/sonic-2.jpg" },
    { id: 3, title: "The Little Mermaid", poster: "/images/little-mermaid.jpg" },
    { id: 4, title: "Guardians of the Galaxy 3", poster: "/images/guardians-3.jpg" },
    { id: 5, title: "Suzume", poster: "/images/suzume.jpg" },
  ];

  const newReleases = [
    { id: 6, title: "Missing", poster: "/images/missing.jpg" },
    { id: 7, title: "A Man Called Otto", poster: "/images/otto.jpg" },
    { id: 8, title: "Big Hero 6", poster: "/images/big-hero-6.jpg" },
    { id: 9, title: "The Tomorrow War", poster: "/images/tomorrow-war.jpg" },
  ];

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
            <div className="nav-brand">CHILL</div>
            <div className="nav-menu-desktop" style={{marginLeft:'40px'}}>
                <a href="#">Series</a>
                <a href="#">Film</a>
                <a href="#">Daftar Saya</a>
            </div>
        </div>
        
        <div className="nav-right">
            <svg className="nav-search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            
            <div onClick={() => navigate('/login')} style={{width:'35px', height:'35px', borderRadius:'50%', background:'#333', cursor:'pointer', overflow:'hidden'}}>
                <img src="https://i.pravatar.cc/150?img=12" alt="User" style={{width:'100%'}}/>
            </div>

            {/* TOMBOL HAMBURGER DENGAN SAKLAR CLICK */}
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{cursor: 'pointer'}}>
                <svg className="nav-hamburger" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </div>
        </div>

        {/* MENU DROPDOWN (HANYA MUNCUL JIKA SAKLAR ON) */}
        {isMenuOpen && (
            <div className="mobile-menu-dropdown">
                <a href="#">Series</a>
                <a href="#">Film</a>
                <a href="#">Daftar Saya</a>
            </div>
        )}
      </div>

      {/* HERO SECTION */}
      <div className="hero" style={{backgroundImage: 'url("/images/hero-bg.jpg")'}}>
         <div className="hero-overlay"></div>
         <div className="hero-content">
            <h1 className="hero-title">Duty After School</h1>
            <p style={{marginBottom:'20px', lineHeight:'1.5'}}>Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, departemen pertahanan mulai memanggil siswa SMA...</p>
            <div style={{display:'flex', gap:'10px'}}>
                <button className="btn btn-primary" style={{borderRadius:'30px', padding:'10px 30px'}}>Mulai</button>
                <button className="btn btn-secondary" style={{borderRadius:'30px', padding:'10px 30px'}}>Selengkapnya</button>
                <span style={{border:'1px solid white', padding:'8px', borderRadius:'50%', width:'40px', textAlign:'center'}}>18+</span>
            </div>
         </div>
      </div>

      {/* SECTION 1 */}
      <div className="movie-section">
        <h3 className="section-title">Melanjutkan Tonton Film</h3>
        <div className="movie-row">
            {continueWatchingData.map(movie => (
                <div key={movie.id} className="movie-card wide">
                    <img src={movie.poster} alt={movie.title} />
                    <div className="movie-info-overlay">
                        <div className="movie-title">{movie.title}</div>
                        <div className="movie-rating">⭐ {movie.rating}</div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="movie-section">
        <h3 className="section-title">Film Trending</h3>
        <div className="movie-row">
            {trendingMovies.map(movie => (
                <div key={movie.id} className="movie-card portrait">
                    <img src={movie.poster} alt={movie.title} />
                </div>
            ))}
        </div>
      </div>
      
      {/* SECTION 3 */}
      <div className="movie-section">
        <h3 className="section-title">Rilis Baru</h3>
        <div className="movie-row">
            {newReleases.map(movie => (
                <div key={movie.id} className="movie-card portrait">
                    <img src={movie.poster} alt={movie.title} />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;