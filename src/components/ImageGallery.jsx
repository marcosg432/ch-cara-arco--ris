import React from 'react';
import { AspectRatio } from './AspectRatio';
import './ImageGallery.css';

// Array com todas as imagens da galeria
const galleryImages = Array.from({ length: 25 }, (_, i) => `/imagem/galeria/galeria-${i + 1}.jpeg`);

export function ImageGallery() {
  // Dividir imagens em 3 colunas
  const columns = 3;
  const imagesPerColumn = Math.ceil(galleryImages.length / columns);
  
  return (
    <div className="image-gallery-container">
      <div className="image-gallery-grid">
        {Array.from({ length: columns }).map((_, col) => (
          <div key={col} className="image-gallery-column">
            {galleryImages
              .slice(col * imagesPerColumn, (col + 1) * imagesPerColumn)
              .map((src, index) => {
                const globalIndex = col * imagesPerColumn + index;
                return (
                  <AnimatedImage
                    key={globalIndex}
                    alt={`Galeria ${globalIndex + 1}`}
                    src={src}
                    ratio={16 / 9}
                  />
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedImage({ alt, src, ratio }) {
  return (
    <AspectRatio
      ratio={ratio}
      className="image-gallery-aspect-ratio"
    >
      <img
        alt={alt}
        src={src}
        className="image-gallery-image"
        loading="lazy"
      />
    </AspectRatio>
  );
}


