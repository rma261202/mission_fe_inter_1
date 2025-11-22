import React from 'react';

const Button = ({ label, variant = 'primary', onClick }) => {
  // Logika: Jika variant='primary' pakai warna biru, jika tidak pakai transparan
  // Class 'btn-full' bikin tombol selebar kotak (cocok buat Login)
  const className = `btn btn-${variant} btn-full`;

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;