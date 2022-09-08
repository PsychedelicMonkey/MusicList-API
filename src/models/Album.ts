import { Schema, model } from 'mongoose';

type Album = {
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

const AlbumSchema = new Schema<Album>(
  {
    discogsId: {
      type: Number,
      required: true,
      unique: true,
    },
    artists: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    genres: [Schema.Types.Mixed],
    images: [Schema.Types.Mixed],
    styles: [Schema.Types.Mixed],
    title: {
      type: String,
      required: true,
    },
    tracklist: [Schema.Types.Mixed],
    videos: [Schema.Types.Mixed],
    year: Number,
  },
  { timestamps: true }
);

export default model<Album>('Album', AlbumSchema);
