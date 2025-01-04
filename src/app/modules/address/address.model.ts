import { model, Schema } from "mongoose";
import { TAddress } from "./address.interface";

const addressSchema = new Schema<TAddress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required !!"],
      unique: true,
    },
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    district: {
      type: String,
      required: [true, "City is required"],
    },
    division: {
      type: String,
      required: [true, "State is required"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

addressSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

addressSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const addressModel = model<TAddress>("Address", addressSchema);
