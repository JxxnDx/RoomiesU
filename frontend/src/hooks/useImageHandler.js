import { useState } from 'react';

export const useImageHandler = (initialImageUrl) => {
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(initialImageUrl);

  const handleRemoveImage = (resetFile) => {
    resetFile();
    setShowUploadOption(true);
  };

  return {
    showUploadOption,
    currentImageUrl,
    setCurrentImageUrl,
    handleRemoveImage,
    setShowUploadOption
  };
};