import { useState } from 'react';
import axios from 'axios';

const useUpdateHabitacion = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const updateHabitacion = async (habitacionId, formData, file) => {
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (file) {
        formDataToSend.append('image', file);
      }

      const response = await axios.put(`http://localhost:4000/api/editarhabitacion/${habitacionId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setMessage({
        text: `Habitación actualizada con éxito! ID: ${response.data.roomId}`,
        type: 'success',
      });
    } catch (error) {
      setMessage({
        text: 'Error: ' + (error.response?.data?.error || error.message),
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, message, updateHabitacion };
};

export default useUpdateHabitacion;
