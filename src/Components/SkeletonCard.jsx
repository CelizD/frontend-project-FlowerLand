import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse">
      {/* Espacio para la imagen */}
      <div className="bg-gray-200 h-64 w-full rounded-2xl mb-4"></div>
      
      {/* Línea para el título */}
      <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3"></div>
      
      {/* Línea para la categoría */}
      <div className="h-3 bg-gray-100 rounded-full w-1/2 mb-6"></div>
      
      {/* Footer de la tarjeta: Precio y Botón */}
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-10 bg-gray-200 rounded-full w-10"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;