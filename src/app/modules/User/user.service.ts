import { UserRole } from "./user.constants";
import { userModel } from "./user.model";

// ! for getting all user
const getUsersFromDb = async () => {
  const result = await userModel.find({ userRole: { $ne: UserRole.admin } });
  return result;
};

//

export const userServices = {
  getUsersFromDb,
};
