import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import validateUser from "../../middleware/ValidateUser";
import { UserRole } from "../User/user.constants";
import { addressController } from "./address.controller";
import { addressValidations } from "./address.validation";

const router = Router();

// ! for getting user address
router.get(
  "/",
  validateUser(UserRole.user, UserRole.admin),
  addressController.getUserAddress
);

// ! for creating address
router.post(
  "/add-user-address",
  validateUser(UserRole.user, UserRole.admin),
  validateRequest(addressValidations.addAddressValidationSchema),
  addressController.addAddress
);

// ! for updating user address
router.patch(
  "/update-user-address/:id",
  validateUser(UserRole.user, UserRole.admin),
  validateRequest(addressValidations.updateAddressValidationSchema),
  addressController.updateUserAddress
);

// ! for deleting user address
router.patch(
  "/delete-user-address/:id",
  validateUser(UserRole.user, UserRole.admin),
  addressController.deleteUserAddress
);

//
export const addressRouter = router;
