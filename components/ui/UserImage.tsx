import React from 'react';
import Image from 'next/image';

type UserImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onClick?: () => void;  
};

export default function UserImage({ src, alt, width, height, onClick }: UserImageProps) {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50%',
        flexShrink: 0,
        cursor: 'pointer', 
      }}
      onClick={onClick}  
    >
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
        style={{ objectFit: 'cover' }}
        fill
        quality={100}
        className="rounded-full"
      />
    </div>
  );
}
