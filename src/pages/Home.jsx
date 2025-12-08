import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- STATE 1: DATA FILM UTAMA (Array of Objects) ---
  // Kita masukkan ke state agar bisa di-update (misal fitur Like)
  const [movies, setMovies] = useState([
    { id: 1, title: "Duty After School", image: "/images/duty-after-school.jpg", rating: 4.5, liked: false },
    { id: 2, title: "Sonic 2", image: "/images/sonic-2.jpg", rating: 4.2, liked: false },
    { id: 3, title: "The Little Mermaid", image: "/images/little-mermaid.jpg", rating: 3.8, liked: false },
    { id: 4, title: "Guardians of the Galaxy 3", image: "/images/guardians-3.jpg", rating: 4.8, liked: false },
    { id: 5, title: "Suzume", image: "/images/suzume.jpg", rating: 4.9, liked: false },
  ]);

  const [topMovies] = useState([
    { id: 101, title: "Don't Look Up", image: "/images/wide-dont-look-up.png", rating: 4.5 },
    { id: 102, title: "Blue Lock", image: "/images/wide-blue-lock.jpg", rating: 4.2 },
    { id: 103, title: "A Man Called Otto", image: "/images/wide-otto.jpg", rating: 4.0 },
  ]);

  // --- STATE 2: DAFTAR SAYA (Keranjang Film) ---
  // Ini untuk menampung film yang dipilih user (Create & Delete)
  const [myList, setMyList] = useState([]);

  // --- FUNGSI 1: CREATE (Tambah ke Daftar Saya) ---
  const handleAddToList = (movie) => {
    // Cek apakah film sudah ada di daftar biar gak dobel
    if (!myList.some(item => item.id === movie.id)) {
      setMyList([...myList, movie]);
      alert(`Berhasil menambahkan ${movie.title} ke Daftar Saya!`);
    } else {
      alert("Film ini sudah ada di daftar kamu!");
    }
  };

  // --- FUNGSI 2: DELETE (Hapus dari Daftar Saya) ---
  const handleRemoveFromList = (id) => {
    const updatedList = myList.filter(item => item.id !== id);
    setMyList(updatedList);
  };

  // --- FUNGSI 3: UPDATE (Fitur Like/Love) ---
  const handleToggleLike = (id) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === id) {
        return { ...movie, liked: !movie.liked }; // Ubah status liked jadi kebalikannya
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

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
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{cursor: 'pointer'}}>
                <svg className="nav-hamburger" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </div>
        </div>

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
            <p style={{marginBottom:'20px', lineHeight:'1.5'}}>Sebuah benda tak dikenal mengambil alih dunia...</p>
            <div style={{display:'flex', gap:'10px'}}>
                <button className="btn btn-primary" style={{borderRadius:'30px', padding:'10px 30px'}}>Mulai</button>
                <button className="btn btn-secondary" style={{borderRadius:'30px', padding:'10px 30px'}}>Selengkapnya</button>
                <span style={{border:'1px solid white', padding:'8px', borderRadius:'50%', width:'40px', textAlign:'center'}}>18+</span>
            </div>
         </div>
      </div>

      {/* SECTION: DAFTAR SAYA (Hanya muncul jika ada isinya) - [READ & DELETE] */}
      {myList.length > 0 && (
        <div className="movie-section" style={{backgroundColor: '#1a1a1a'}}>
          <h3 className="section-title">Daftar Saya (My List)</h3>
          <div className="movie-row">
              {myList.map(movie => (
                  <div key={movie.id} className="movie-card portrait">
                      <img src={movie.image} alt={movie.title} />
                      <div className="movie-info-overlay">
                        {/* Tombol Hapus */}
                        <button 
                          onClick={() => handleRemoveFromList(movie.id)}
                          className="btn-circle"
                          style={{backgroundColor: 'red', border:'none', marginTop:'5px'}}
                        >
                          X
                        </button>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      )}

      {/* SECTION: Melanjutkan Tonton */}
      <div className="movie-section">
        <h3 className="section-title">Melanjutkan Tonton Film</h3>
        <div className="movie-row">
            {topMovies.map(movie => (
                <div key={movie.id} className="movie-card wide">
                    <img src={movie.image} alt={movie.title} />
                    <div className="movie-info-overlay">
                        <div className="movie-title">{movie.title}</div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* SECTION: Trending Film (Interaktif) - [CREATE & UPDATE] */}
      <div className="movie-section">
        <h3 className="section-title">Film Trending (Klik + untuk Add)</h3>
        <div className="movie-row">
            {movies.map(movie => (
                <div key={movie.id} className="movie-card portrait">
                    <img src={movie.image} alt={movie.title} />
                    <div className="movie-info-overlay" style={{display:'flex', gap:'5px', flexDirection:'column', alignItems:'start'}}>
                        {/* Tombol Tambah ke Daftar */}
                        <button 
                          onClick={() => handleAddToList(movie)}
                          className="btn-circle" 
                          style={{fontSize:'18px', fontWeight:'bold'}}
                        >
                          +
                        </button>
                        
                        {/* Tombol Like (Update State) */}
                        <button 
                          onClick={() => handleToggleLike(movie.id)}
                          style={{
                            background: 'transparent', border:'none', cursor:'pointer', 
                            fontSize:'20px', color: movie.liked ? 'red' : 'white'
                          }}
                        >
                          ♥
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;