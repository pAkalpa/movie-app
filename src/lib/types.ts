export interface ILoginRegister {
  email: string;
  password: string;
}

export interface SearchContextType {
  searchValue: string;
  handleSearch: (value: string) => void;
}

export interface IMovieUpdateData {
  title: string;
  genre: string;
  language: string;
  release: string;
  runtime: string;
  plot: string;
  image?: any;
}
