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
