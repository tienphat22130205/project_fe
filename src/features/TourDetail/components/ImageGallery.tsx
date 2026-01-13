import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 mb-4 sm:mb-6 rounded-lg overflow-hidden">
      {/* Main Image */}
      <div className="col-span-2 md:col-span-2 h-[180px] sm:h-[250px] md:h-[400px]">
        <img
          src={images[0]}
          alt="Main tour"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Small Images Grid */}
      <div className="col-span-2 md:col-span-1 grid grid-cols-4 md:grid-cols-2 gap-1 sm:gap-2">
        {images.slice(1, 5).map((img, index) => (
          <div key={index} className="h-[80px] sm:h-[100px] md:h-[196px]">
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
