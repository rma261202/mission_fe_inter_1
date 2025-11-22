import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 style={{fontSize:'32px', marginBottom:'10px', fontWeight:'bold'}}>CHILL</h1>
        <h4 style={{marginBottom:'30px'}}>Masuk</h4>
        
        <form onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
            <Input label="Username" type="text" placeholder="Masukkan username" />
            <Input label="Kata Sandi" type="password" placeholder="Masukkan kata sandi" />

            <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#aaa', marginBottom:'30px', marginTop:'-10px'}}>
                <span>Belum punya akun? <span onClick={() => navigate('/register')} style={{color:'white', fontWeight:'bold', cursor:'pointer'}}>Daftar</span></span>
                <span style={{cursor:'pointer'}}>Lupa kata sandi?</span>
            </div>

            <Button label="Masuk" variant="primary" />
            
            <p style={{margin:'15px 0', fontSize:'12px', color:'#666'}}>Atau</p>
            
            <Button label="Masuk dengan Google" variant="secondary" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;