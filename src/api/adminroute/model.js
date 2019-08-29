import mongoose, { Schema } from 'mongoose';

const adminrouteSchema = new Schema(
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

adminrouteSchema.methods = {
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

const model = mongoose.model('Adminroute', adminrouteSchema);

export const schema = model.schema;
export default model;
