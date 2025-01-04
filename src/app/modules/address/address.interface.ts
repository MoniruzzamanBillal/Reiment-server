import { Types } from "mongoose";

export type TAddress = {
  user: Types.ObjectId;
  street: string;
  district: string;
  division: string;
  postalCode: string;
  isDeleted: boolean;
};
