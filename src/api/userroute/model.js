import mongoose, { Schema } from 'mongoose';

const userrouteSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
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

userrouteSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
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

const model = mongoose.model('Userroute', userrouteSchema);

export const schema = model.schema;
export default model;
