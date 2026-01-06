import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // 1. Import Hooks Redux
import { setMovies } from '../store/redux/movieSlice';   // 2. Import Action Redux
import Footer from '../components/Footer';
import api from '../api/axiosInstance'; // Pastikan path ini benar sesuai file kamu

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 3. Siapkan Dispatch

  // --- GANTI STATE LOKAL DENGAN REDUX ---
  // HAPUS: const [movies, setMovies] = useState([]);
  // GANTI JADI:
  const { movies } = useSelector((state) => state.movies); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [myList, setMyList] = useState([]); // Biarkan MyList tetap lokal dulu (opsional)

  // --- STATE MODAL (FORM) ---
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [movieForm, setMovieForm] = useState({
    title: "",
    poster: "",
    rating: "", 
    year: ""
  });

  // --- DATA DUMMY ---
  const [topMovies] = useState([
    { id: 101, title: "Don't Look Up", image: "/images/wide-dont-look-up.png" },
    { id: 102, title: "Blue Lock", image: "/images/wide-blue-lock.jpg" },
    { id: 103, title: "A Man Called Otto", image: "/images/wide-otto.jpg" },
  ]);

  // --- 1. READ (GET) - REDUX VERSION ---
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get("/movies");
      // GANTI: setMovies(response.data) MENJADI:
      dispatch(setMovies(response.data)); 
      console.log("Data fetched & dispatched to Redux");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // --- 2. DELETE (HAPUS) - REDUX VERSION ---
  const handleDeleteMovie = async (id) => {
    if (window.confirm("Yakin hapus permanen?")) {
      try {
        await api.delete(`/movies/${id}`);
        // Update Redux State secara manual agar tidak perlu fetch ulang
        const updatedMovies = movies.filter(m => m.id !== id);
        dispatch(setMovies(updatedMovies));
      } catch (error) {
        alert("Gagal hapus!");
      }
    }
  };

  // --- SIAPKAN MODE TAMBAH ---
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setMovieForm({ title: "", poster: "", rating: "", year: "" });
    setShowModal(true);
  };

  // --- SIAPKAN MODE EDIT ---
  const handleOpenEditModal = (movie) => {
    setIsEditMode(true);
    setCurrentId(movie.id);
    setMovieForm({
      title: movie.title,
      poster: movie.poster,
      rating: movie.rating,
      year: movie.year
    });
    setShowModal(true);
  };

  // --- 3 & 4. CREATE & UPDATE - REDUX VERSION ---
  const handleSubmitMovie = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // --- UPDATE (PUT) ---
        const response = await api.put(`/movies/${currentId}`, movieForm);
        
        // Update Redux: Cari yg id-nya sama, ganti isinya, lalu dispatch setMovies baru
        const updatedMovies = movies.map(m => m.id === currentId ? response.data : m);
        dispatch(setMovies(updatedMovies));
        
        alert("Film berhasil diedit!");
      } else {
        // --- CREATE (POST) ---
        const response = await api.post("/movies", movieForm);
        
        // Update Redux: Ambil array lama, tambah data baru, dispatch
        const newMovies = [...movies, response.data];
        dispatch(setMovies(newMovies));
        
        alert("Film berhasil ditambahkan!");
      }

      setShowModal(false);
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Terjadi kesalahan.");
    }
  };

  // --- FITUR LOKAL ---
  const handleAddToList = (movie) => {
    if (!myList.some(item => item.id === movie.id)) setMyList([...myList, movie]);
  };
  const handleRemoveFromList = (id) => setMyList(myList.filter(item => item.id !== id));

  return (
    <div style={{position: 'relative'}}>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
            <div className="nav-brand">CHILL</div>
            <div className="nav-menu-desktop" style={{marginLeft:'40px'}}>
                <a href="#">Series</a><a href="#">Film</a><a href="#">Daftar Saya</a>
            </div>
        </div>
        <div className="nav-right">
             <div onClick={() => navigate('/login')} style={{cursor:'pointer'}}>
                <img src="https://i.pravatar.cc/150?img=12" alt="User" style={{width:'35px', borderRadius:'50%'}}/>
            </div>
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{cursor: 'pointer', marginLeft: '10px'}}>☰</div>
        </div>
        {isMenuOpen && <div className="mobile-menu-dropdown"><a href="#">Home</a></div>}
      </div>

      {/* HERO SECTION */}
      <div className="hero" style={{backgroundImage: 'url("/images/hero-bg.jpg")'}}>
         <div className="hero-content">
            <h1 className="hero-title">Duty After School</h1>
            <p>Sebuah benda tak dikenal mengambil alih dunia...</p>
            <button className="btn btn-primary">Mulai</button>
         </div>
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{backgroundColor: '#222', padding: '30px', borderRadius: '10px', width: '90%', maxWidth: '400px'}}>
            <h2 style={{color: 'white', marginBottom: '20px'}}>
              {isEditMode ? "Edit Film" : "Tambah Film Baru"}
            </h2>
            <form onSubmit={handleSubmitMovie} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <input 
                placeholder="Judul Film" 
                value={movieForm.title}
                onChange={(e) => setMovieForm({...movieForm, title: e.target.value})}
                style={{padding: '10px'}} required 
              />
              <input 
                placeholder="Link Gambar (URL)" 
                value={movieForm.poster}
                onChange={(e) => setMovieForm({...movieForm, poster: e.target.value})}
                style={{padding: '10px'}} required 
              />
              <input 
                placeholder="Rating (Contoh: 4.5)" 
                value={movieForm.rating}
                onChange={(e) => setMovieForm({...movieForm, rating: e.target.value})}
                style={{padding: '10px'}} 
              />
              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button type="submit" className="btn-primary" style={{flex: 1, padding: '10px', border:'none', cursor:'pointer'}}>
                  {isEditMode ? "Update Perubahan" : "Simpan Baru"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} style={{flex: 1, padding: '10px', background:'red', color:'white', border:'none', cursor:'pointer'}}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DAFTAR SAYA */}
      {myList.length > 0 && (
        <div className="movie-section" style={{backgroundColor: '#1a1a1a'}}>
          <h3 className="section-title">Daftar Saya</h3>
          <div className="movie-row">
              {myList.map(movie => (
                  <div key={movie.id} className="movie-card portrait">
                      <img src={movie.poster || movie.image} alt={movie.title} />
                      <button onClick={() => handleRemoveFromList(movie.id)} className="btn-circle" style={{background:'red'}}>X</button>
                  </div>
              ))}
          </div>
        </div>
      )}

      {/* MELANJUTKAN TONTON */}
      <div className="movie-section">
        <h3 className="section-title">Melanjutkan Tonton Film</h3>
        <div className="movie-row">
            {topMovies.map(movie => (
                <div key={movie.id} className="movie-card wide">
                    <img src={movie.image} alt={movie.title} />
                    <div className="movie-info-overlay">
                        <span style={{color: 'white', fontWeight: 'bold'}}>{movie.title}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* TRENDING (API + REDUX) */}
      <div className="movie-section">
        <h3 className="section-title">Film Trending (Dari API & Redux)</h3>
        <div className="movie-row">
            {/* PASTIKAN MOVIES ADA ISINYA SEBELUM DI-MAP */}
            {movies && movies.length > 0 ? (
                movies.map(movie => (
                    <div key={movie.id} className="movie-card portrait">
                        <img src={movie.poster} alt={movie.title} />
                        <div className="movie-info-overlay">
                            <button 
                              onClick={() => handleOpenEditModal(movie)}
                              style={{
                                background: '#f59e0b', border: 'none', color: 'black', 
                                padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight:'bold', marginBottom:'5px'
                              }}
                            >
                              Edit ✏️
                            </button>
                            
                            <div style={{display:'flex', gap:'5px', marginTop:'5px'}}>
                               <button onClick={() => handleAddToList(movie)} className="btn-circle">+</button>
                               <button onClick={() => handleDeleteMovie(movie.id)} style={{background:'red', border:'none', color:'white', padding:'5px 10px', borderRadius: '5px', cursor:'pointer'}}>
                                 Hapus 🗑️
                               </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{color: 'white', padding: '20px'}}>Loading data atau data kosong...</p>
            )}
        </div>
      </div>

      {/* TOMBOL FLOATING (+) */}
      <button 
        onClick={handleOpenAddModal}
        style={{
          position: 'fixed', bottom: '30px', right: '30px',
          width: '60px', height: '60px', borderRadius: '50%',
          backgroundColor: '#007bff', color: 'white', fontSize: '30px',
          border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          zIndex: 999
        }}
      >
        +
      </button>

      <Footer />
    </div>
  );
};

export default HomePage;