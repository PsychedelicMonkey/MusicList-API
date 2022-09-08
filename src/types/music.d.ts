export type Album = {
  discogsId: number;
  artists: Array<object>;
  genres: Array<string>;
  images: Array<object>;
  styles: Array<string>;
  title: string;
  tracklist: Array<object>;
  videos: Array<object>;
  year: number;
};

export type Artist = {
  discogsId: number;
  images: Array<object>;
  members?: Array<object>;
  name: string;
  namevariations?: Array<string>;
  profile: string;
  realname?: string;
  urls: Array<string>;
};
