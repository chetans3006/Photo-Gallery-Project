'use client';

import { Photo } from '@/hooks/useFetchPhotos';
import Image from 'next/image';

interface PhotoCardProps {
  photo: Photo;
  isFavorite: boolean;
  onToggleFavorite: (photoId: string) => void;
}

export const PhotoCard = ({ photo, isFavorite, onToggleFavorite }: PhotoCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      
      <div className="p-4 flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-gray-600">Photo by</p>
          <p className="font-medium text-gray-900 truncate">{photo.author}</p>
        </div>
        
        <button
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="ml-2 flex-shrink-0 focus:outline-none"
        >
          <svg
            className={`w-6 h-6 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400 hover:text-gray-600'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
