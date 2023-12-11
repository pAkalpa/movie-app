export interface ILoginRegister {
  email: string;
  password: string;
}

export interface SearchContextType {
  searchValue: string;
  handleSearch: (value: string) => void;
}

export interface IMovieUpdateData {
  id?: string;
  title: string;
  genre: string;
  language: string;
  release: string;
  runtime: string;
  plot: string;
  image?: string;
}

export interface IMovieUpdate {
  id: string;
  title?: string;
  genre?: string;
  language?: string;
  image?: string;
  release?: string;
  runtime?: string;
  plot?: string;
}
