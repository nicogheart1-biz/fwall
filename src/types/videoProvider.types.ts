import { WebmasterSearchOptions } from "pornhub.js";

export type VideoProviderQueryI = WebmasterSearchOptions & { keyword: string };

export type VideoProviderI = {
  name: string;
  id: string;
  website: string;
  api?: string;
  details?: string;
  queries?: string[] | VideoProviderQueryI[];
  active?: boolean;
};

export type VideoI = {
  id: string;
  cover: string;
  embedUrl?: string;
  length?: string;
  provider: string;
  rate?: string;
  title: string;
  thumbs?: string[];
  url: string;
  views?: string;
};