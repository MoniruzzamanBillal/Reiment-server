import { model, Schema } from "mongoose";
import { UserRole, UserStatus } from "./user.constants";
import bcrypt from "bcrypt";
import config from "../../config";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "user name is required "],
    },
    email: {
      type: String,
      required: [true, "user email is required "],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "user password is required "],
    },
    profilePicture: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    userRole: {
      type: String,
      default: UserRole.user,
    },
    status: {
      type: String,
      default: UserStatus.active,
    },
  },
  {
    timestamps: true,
  }
);

// ! hash password before storing in db
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// ! send password empty in response
userSchema.post("save", async function (doc, next) {
  doc.password = "";

  next();
});

userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

userSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

//
export const userModel = model<TUser>("User", userSchema);
