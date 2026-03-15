import { useReducer, useEffect } from 'react';

type FavoritesAction = 
  | { type: 'TOGGLE_FAVORITE'; photoId: string }
  | { type: 'LOAD_FAVORITES'; favorites: string[] };

const favoritesReducer = (state: Set<string>, action: FavoritesAction): Set<string> => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const newState = new Set(state);
      if (newState.has(action.photoId)) {
        newState.delete(action.photoId);
      } else {
        newState.add(action.photoId);
      }
      return newState;
    }
    case 'LOAD_FAVORITES': {
      return new Set(action.favorites);
    }
    default:
      return state;
  }
};

export const useFavoritesReducer = () => {
  const [favorites, dispatch] = useReducer(favoritesReducer, new Set<string>());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        const favorites = JSON.parse(saved);
        dispatch({ type: 'LOAD_FAVORITES', favorites });
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
  }, []);

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (photoId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', photoId });
  };

  return { favorites, toggleFavorite };
};
