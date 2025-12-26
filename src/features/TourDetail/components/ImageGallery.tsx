import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 rounded-lg overflow-hidden">
      {/* Main Image */}
      <div className="md:col-span-2 h-[300px] md:h-[400px]">
        <img
          src={images[0]}
          alt="Main tour"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Small Images Grid */}
      <div className="grid grid-cols-2 gap-2">
        {images.slice(1).map((img, index) => (
          <div key={index} className="h-[145px] md:h-[196px]">
            <img
              src={img}
              alt={`Tour ${index + 2}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
