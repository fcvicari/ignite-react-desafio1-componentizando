import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

interface ApiContextProviderProps {
  children: ReactNode;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ApiContextProviderData {
  selectedGenre: GenreResponseProps;
  genres: GenreResponseProps[];
  movies: MovieProps[];
  selectedGenreId: number;
  handleClickButton(id: number): void;
}

export const ApiContext = createContext({} as ApiContextProviderData);

export function ApiContextProvider({ children }: ApiContextProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <ApiContext.Provider
      value={{
        selectedGenre,
        genres,
        movies,
        selectedGenreId,
        handleClickButton,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
