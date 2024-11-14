import { Types } from "mongoose";
import { cartModel } from "./cart.model";

type ICart = {
  userId: string;
  productId: string;
  quantity: number;
  price: number;
};
// ! for creating a cart
const addUpdateCart = async (payload: ICart) => {
  const { userId, productId, quantity, price } = payload;

  const cart = await cartModel.findOne({ user: userId });

  if (cart) {
    const existCartItemIndex = cart.cartItems.findIndex(
      (item) => item?.product.toString() === productId
    );

    if (existCartItemIndex > -1) {
      cart.cartItems[existCartItemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({
        product: new Types.ObjectId(productId),
        quantity: quantity,
        price: price,
      });
    }

    await cart.save();

    return cart;
  } else {
    const newCart = await cartModel.create({
      user: userId,
      cartItems: [{ product: productId, quantity, price }],
    });

    return newCart;
  }
};

//
export const cartServices = {
  addUpdateCart,
};
