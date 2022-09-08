import { Schema, model } from 'mongoose';

type Artist = {
  discogsId: number;
  images: Array<object>;
  members?: Array<object>;
  name: string;
  namevariations?: Array<string>;
  profile: string;
  realname?: string;
  urls: Array<string>;
};

const ArtistSchema = new Schema<Artist>(
  {
    discogsId: {
      type: Number,
      required: true,
      unique: true,
    },
    images: [Schema.Types.Mixed],
    members: {
      type: [Schema.Types.Mixed],
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    namevariations: {
      type: [String],
      required: false,
    },
    profile: {
      type: String,
    },
    realname: {
      type: String,
      required: false,
    },
    urls: [String],
  },
  { timestamps: true }
);

export default model<Artist>('Artist', ArtistSchema);
