import Products from "../types/products";
import httpAdapter from "./httpAdapter";

export default async function getProducts(): Promise<Products[]> {
  return await httpAdapter("/products");
}
