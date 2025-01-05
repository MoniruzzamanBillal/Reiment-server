import Jwt from "jsonwebtoken";

export const createToken = (
  payload: { userId: string; userRole: string; email?: string },
  secret: string,
  expire: string
) => {
  return Jwt.sign(payload, secret, { expiresIn: expire });
};
