export interface OMDbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDbSearchResponse {
  Search: OMDbMovie[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
}
