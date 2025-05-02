import { useState, useEffect } from 'react';

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    if (!selectedFile.type.match('image.*')) {
      setError('Por favor, sube solo archivos de imagen');
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('La imagen no debe exceder los 5MB');
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };

  const resetFile = () => {
    setFile(null);
    setError('');
  };

  return {
    file,
    preview,
    error,
    handleFileChange,
    resetFile,
    setError
  };
};