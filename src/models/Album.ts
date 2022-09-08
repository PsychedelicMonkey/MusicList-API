import { Schema, model } from 'mongoose';
import type { Album } from 'music';

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
