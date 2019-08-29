import mongoose, { Schema } from 'mongoose';

const masterrouteSchema = new Schema(
  {
    bla: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);

masterrouteSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      bla: this.bla,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full
      ? {
          ...view,
          // add properties for a full view
        }
      : view;
  },
};

const model = mongoose.model('Masterroute', masterrouteSchema);

export const schema = model.schema;
export default model;
