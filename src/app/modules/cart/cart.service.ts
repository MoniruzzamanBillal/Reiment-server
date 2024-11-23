import httpStatus from "http-status";
import { Types } from "mongoose";
import AppError from "../../Error/AppError";
import { productModel } from "../product/product.model";
import { ICart, TCartItem } from "./cart.interface";
import { cartModel } from "./cart.model";

// ! for getting user cart data
const getUserCart = async (userId: string) => {
  const result = await cartModel.findOne({ user: userId });

  return result;
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

// ! for adding cart item
const addingCartItem = async (
  payload: { productId: string; quantity: number; price: number },
  userId: string
) => {
  const { productId, quantity, price } = payload;

  const userCartData = await cartModel.findOne({ user: userId });

  const productExist = await productModel.findById(productId);

  if (!productExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product don't exist !!");
  }

  if (!userCartData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User cart dont exist !!");
  }

  const productIndex = userCartData.cartItems.findIndex(
    (item: TCartItem) => item?.product.toString() === productId
  );

  if (productIndex > -1) {
    userCartData.cartItems[productIndex].quantity += quantity;
  } else {
    userCartData.cartItems.push({
      product: new Types.ObjectId(productId),
      quantity: quantity,
      price: price,
    });
  }

  await userCartData.save();

  return userCartData;
};

// ! for removing cart item
const removeCartItem = async (productId: string, userId: string) => {
  const userCartData = await cartModel.findOne({ user: userId });

  const productExist = await productModel.findById(productId);

  if (!productExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product don't exist !!");
  }

  if (!userCartData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User cart dont exist !!");
  }

  userCartData.cartItems = userCartData.cartItems?.filter(
    (item: TCartItem) => item?.product.toString() !== productId
  );

  await userCartData.save();

  return userCartData;
};

// ! for adding cart  item quantity
const addCartItemQuantity = async (
  payload: { productId: string; quantity: number },
  userId: string
) => {
  const { productId, quantity } = payload;

  const userCartData = await cartModel.findOne({ user: userId });

  const productExist = await productModel.findById(productId);

  if (!productExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product don't exist !!");
  }

  if (!userCartData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User cart dont exist !!");
  }

  const productIndex = userCartData.cartItems.findIndex(
    (item: TCartItem) => item?.product.toString() === productId
  );

  if (productIndex <= -1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This item don't exist in your cart !!"
    );
  }

  if (
    userCartData.cartItems[productIndex].quantity + quantity >
    productExist?.stockQuantity
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Product stock quantity exceeds !! You can't add this product  "
    );
  }

  userCartData.cartItems[productIndex].quantity += quantity;

  await userCartData.save();

  return userCartData;
};

// ! for decreasing cart item quantity
const decreaseCartItemQuantity = async (
  payload: { productId: string; quantity: number },
  userId: string
) => {
  const { productId, quantity } = payload;

  const userCartData = await cartModel.findOne({ user: userId });

  const productExist = await productModel.findById(productId);

  if (!productExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product don't exist !!");
  }

  if (!userCartData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User cart dont exist !!");
  }

  const productIndex = userCartData.cartItems.findIndex(
    (item: TCartItem) => item?.product.toString() === productId
  );

  if (productIndex <= -1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This item don't exist in your cart !!"
    );
  }

  userCartData.cartItems[productIndex].quantity -= quantity;

  await userCartData.save();

  return userCartData;
};

//
export const cartServices = {
  addUpdateCart,
  getUserCart,
  addingCartItem,
  removeCartItem,
  addCartItemQuantity,
  decreaseCartItemQuantity,
};
