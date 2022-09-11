import type { List } from 'list';
import { Schema, model } from 'mongoose';

const ListSchema = new Schema<List>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      many: false,
    },
    albums: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Album',
          many: true,
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default model<List>('List', ListSchema);
