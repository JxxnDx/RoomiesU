import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBack, IoCheckmarkDone, IoAlertCircle, IoInformationCircle, IoCloudUpload } from "react-icons/io5";
import { COLORS } from '../constants/styles';
import { useUnits } from '../hooks/useUnits';
import { useAdmin } from '../hooks/useAdmin';
import { useFileUpload } from '../hooks/useFileUpload';
import { useHabitacionData } from '../hooks/useHabitacionData';
import { useSectoresData } from '../hooks/useSectoresData';
import { useEditarHabitacionForm } from '../hooks/useEditarHabitacionForm';
import { useImageHandler } from '../hooks/useImageHandler';

export default function EditarHabitacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Hooks personalizados
  const { adminId } = useAdmin();
  const { units, isLoading: isLoadingUnits } = useUnits(adminId);
  const { habitacion, loading, error, handleChange } = useHabitacionData(id);
  const { sectores } = useSectoresData();
  const { file, preview: newImagePreview, error: fileError, handleFileChange, resetFile } = useFileUpload();
  const { showUploadOption, handleRemoveImage } = useImageHandler(habitacion.Img_url);
  const { message,errors, handleSubmit } = useEditarHabitacionForm(habitacion, id, file, navigate);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Cargando datos de la habitación...</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="flex ml-32 m-4 text-black">
        <Link to="/habitacion" className="flex items-center hover:text-[#01b09e] transition-all">
          <IoArrowBack className="mr-2" /> <span>Habitaciones</span>
        </Link> - <span> Editar Habitación</span>
      </h3>

      <div className={`max-w-2xl mx-auto p-6 rounded-lg shadow-md ${COLORS["light_primary"]} border border-gray-200 mb-10`}>
        <h2 className="text-2xl font-bold mb-4 text-black">Editar Habitación</h2>

        {message.text && (
          <div className={`mb-6 p-4 rounded-md flex items-start ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
          }`}>
            {message.type === 'error' ? (
              <IoAlertCircle className="mt-1 mr-2 flex-shrink-0" size={20} />
            ) : (
              <IoInformationCircle className="mt-1 mr-2 flex-shrink-0" size={20} />
            )}
            <div>
              <p className="font-medium">{message.text}</p>
              {message.details && (
                <ul className="mt-2 text-sm list-disc list-inside">
                  {Object.entries(message.details).map(([field, error]) => (
                    error !== 'OK' && <li key={field}>{field}: {error}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black">
                Precio (mensual)<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="Precio"
                  value={habitacion.Precio}
                  onChange={handleChange}
                  className={`bg-white mt-1 block w-full pl-7 rounded-md shadow-sm p-2 border ${
                    errors.Precio ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-[#01b09e]'
                  }`}
                  placeholder="300"
                  min="1"
                  step="1"
                  required
                />
              </div>
              {errors.Precio && <p className="text-sm text-red-600 mt-1">{errors.Precio}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Unidad de Vivienda<span className="text-red-500">*</span>
              </label>
              <select
                name="Id_Unidad"
                value={habitacion.Id_Unidad}
                onChange={handleChange}
                className="bg-white mt-1 block w-full rounded-md shadow-sm p-2 border border-gray-200 focus:ring-2 focus:ring-[#01b09e]"
                required
                disabled={isLoadingUnits}
              >
                <option value="">Selecciona una unidad</option>
                {units.map(unit => (
                  <option key={unit.Id_Unidad} value={unit.Id_Unidad}>
                    {unit.Nombre} - {unit.Tipo} ({unit.Direccion})
                  </option>
                ))}
              </select>
              {isLoadingUnits && <p className="mt-1 text-sm text-gray-500">Cargando unidades...</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Estado<span className="text-red-500">*</span>
              </label>
              <select
                name="estado"
                value={habitacion.estado}
                onChange={handleChange}
                className="bg-white w-full p-2 mt-1 rounded border border-gray-200 focus:ring-2 focus:ring-[#01b09e]"
                required
              >
                <option value="">Seleccione uno</option>
                <option value="habilitado">Habilitado</option>
                <option value="deshabilitado">Deshabilitado</option>
                <option value="ocupado">Ocupado</option>
              </select>
            </div>
          </div>

          {/* Campo de imagen */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Imagen de la Habitación
            </label>
            <div className={`bg-white mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
              errors.image ? 'border-red-300' : 'border-gray-300'
            }`}>
              <div className="space-y-1 text-center">
                {(newImagePreview || (habitacion.Img_url && !showUploadOption)) ? (
                  <div className="relative">
                    <img 
                      src={newImagePreview || habitacion.Img_url} 
                      alt="Preview" 
                      className="mx-auto h-48 object-cover rounded-md" 
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <IoCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#01b09e] hover:text-[#018ab0] focus-within:outline-none">
                        <span>Sube una imagen</span>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">o arrástrala aquí</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF hasta 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
            {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}
            <p className="mt-1 text-sm text-gray-500">
              {file ? 'Nueva imagen seleccionada' : 
               habitacion.Img_url && !showUploadOption ? 'Haz clic en la X para cambiar la imagen' : 
               'Sube una imagen para la habitación'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Descripción<span className="text-red-500">*</span>
            </label>
            <textarea
              name="Descripcion"
              value={habitacion.Descripcion}
              onChange={handleChange}
              rows={4}
              className="bg-white mt-1 block w-full rounded-md shadow-sm p-2 border border-gray-200 focus:ring-2 focus:ring-[#01b09e]"
              placeholder="Describe la habitación, incluyendo mobiliario, comodidades, etc."
              required
            />
            <p className="mt-1 text-sm text-gray-500">Mínimo 20 caracteres. Actual: {habitacion.Descripcion?.length}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Requisitos para alquilar<span className="text-red-500">*</span>
            </label>
            <textarea
              name="Requisitos"
              value={habitacion.Requisitos}
              onChange={handleChange}
              rows={4}
              className="bg-white mt-1 block w-full rounded-md shadow-sm p-2 border border-gray-200 focus:ring-2 focus:ring-[#01b09e]"
              placeholder="Ej. Fotocopia de cédula, contrato de trabajo, etc."
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#01b09e] hover:bg-[#019688] text-white px-6 py-2 rounded flex items-center"
            >
              <IoCheckmarkDone className="mr-2" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </>
  );
}