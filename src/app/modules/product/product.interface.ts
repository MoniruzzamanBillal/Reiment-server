export type TProduct = {
  name: string;
  detail: string;
  price: number;
  size: Array<"M" | "L" | "XL" | "XXL">;
  color: string[];
  material: string;
  stockQuantity: number;
  productImage?: string;
  isDeleted: boolean;
};
