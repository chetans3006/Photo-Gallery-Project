"use client";

import { useCallback, useMemo, useState } from "react";
import { useFetchPhotos } from "@/hooks/useFetchPhotos";
import { useFavoritesReducer } from "@/hooks/useFavoritesReducer";
import { SearchBar } from "./SearchBar";
import { PhotoCard } from "./PhotoCard";

export const PhotoGallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const { favorites, toggleFavorite } = useFavoritesReducer();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [photos, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-600">Loading photos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error loading photos</p>
          <p className="text-gray-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Photo Gallery
          </h1>
          <p className="text-gray-600">
            Browse and favorite your favorite photos
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No photos found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favorites.has(photo.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-sm text-gray-600 text-center">
          Showing {filteredPhotos.length} of {photos.length} photos
        </div>
      </div>
    </main>
  );
};
