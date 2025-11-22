import React from 'react';

const Input = ({ label, type, placeholder }) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        className="form-input" 
      />
    </div>
  );
};

export default Input;