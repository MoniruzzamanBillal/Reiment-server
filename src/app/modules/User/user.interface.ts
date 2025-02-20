export type TUserRole = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  isDeleted: boolean;
  userRole: "admin" | "user";
  status: "blocked" | "active";
  createdAt: Date;
  updatedAt: Date;
};

export type Tlogin = {
  email: string;
  password: string;
};
