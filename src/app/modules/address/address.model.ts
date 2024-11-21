import { model, Schema } from "mongoose";
import { TAddress } from "./address.interface";

export const addressSchema = new Schema<TAddress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required !!"],
    },
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

addressSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: false } });
  next();
});

addressSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: false } });
  next();
});

export const addressModel = model<TAddress>("Address", addressSchema);
