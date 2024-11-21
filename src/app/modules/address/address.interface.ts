import { Types } from "mongoose";

export type TAddress = {
  user: Types.ObjectId;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDeleted: boolean;
};
