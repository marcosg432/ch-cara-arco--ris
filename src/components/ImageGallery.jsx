import React from 'react';
import { AspectRatio } from './AspectRatio';
import './ImageGallery.css';

export function ImageGallery() {
  return (
    <div className="image-gallery-container">
      <div className="image-gallery-grid">
        {Array.from({ length: 3 }).map((_, col) => (
          <div key={col} className="image-gallery-column">
            {Array.from({ length: 10 }).map((_, index) => {
              const isPortrait = Math.random() > 0.5;
              const width = isPortrait ? 1080 : 1920;
              const height = isPortrait ? 1920 : 1080;
              const ratio = isPortrait ? 9 / 16 : 16 / 9;
              return (
                <AnimatedImage
                  key={`${col}-${index}`}
                  alt={`Image ${col}-${index}`}
                  src={`https://picsum.photos/seed/${col}-${index}/${width}/${height}`}
                  ratio={ratio}
                  placeholder={`https://placehold.co/${width}x${height}/`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedImage({ alt, src, ratio, placeholder }) {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <AspectRatio
      ratio={ratio}
      className="image-gallery-aspect-ratio"
    >
      <img
        alt={alt}
        src={imgSrc}
        className="image-gallery-image"
        loading="lazy"
        onError={handleError}
      />
    </AspectRatio>
  );
}


