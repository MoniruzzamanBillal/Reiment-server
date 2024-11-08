export type TProduct = {
  name: string;
  detail: string;
  price: number;
  size: string[];
  color: string[];
  material: string;
  stockQuantity: number;
  productImages?: string[];
  isDeleted: boolean;
};
