export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:            string;
  type:          string;
  place_type:    string[];
  relevance:     number;
  properties:    Properties;
  text_id:       string;
  language_id?:  Language;
  place_name_id: string;
  text:          string;
  language?:     Language;
  place_name:    string;
  bbox:          number[];
  center:        number[];
  geometry:      Geometry;
  context:       Context[];
}

export interface Context {
  id:           string;
  mapbox_id:    string;
  text_id:      string;
  text:         string;
  wikidata?:    string;
  language_id?: Language;
  language?:    Language;
  short_code?:  Language;
}

export enum Language {
  ID = "id",
  IDJt = "ID-JT",
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  mapbox_id: string;
  wikidata?: string;
}
