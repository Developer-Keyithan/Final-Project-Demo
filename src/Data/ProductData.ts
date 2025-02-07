import CartImage from "../Assets/Hero.jpg";
import { StaticImageData } from "next/image";

interface Product {
  id: string;
  image: string | StaticImageData;
  relatedImages: (string | StaticImageData)[];
  name: string;
  description: string;
  rating: string;
  district: string;
  freshness: string;
  agricationMethod: string;
  deliveryType: string;
  newPrice: string;
  oldPrice: string;
}


const createProduct = (
  id: string,
  name: string,
  description: string = "Pure Jaffna Tomato"
): Product => ({
  id,
  image: CartImage,
  relatedImages: Array(5).fill(CartImage),
  name,
  description,
  rating: "100+",
  district: "Jaffna",
  freshness: "Harvested Today",
  agricationMethod: "Organic",
  deliveryType: "Free Delivery",
  newPrice: "188",
  oldPrice: "213",
});

const ProductData: Product[] = [
  createProduct("PR0001", "Potato"),
  createProduct("PR0002", "Tomato"),
  createProduct("PR0003", "Chilli"),
  createProduct("PR0004", "Potato"),
  createProduct("PR0005", "Tomato"),
  createProduct("PR0006", "Chilli"),
  createProduct("PR0007", "Potato"),
  createProduct("PR0008", "Tomato"),
  createProduct("PR0009", "Chilli"),
  createProduct("PR0010", "Potato"),
  createProduct("PR0011", "Tomato"),
  createProduct("PR0012", "Chilli"),
  createProduct("PR0013", "Potato"),
  createProduct("PR0014", "Tomato"),
  createProduct("PR0015", "Chilli"),
  createProduct("PR0016", "Potato"),
  createProduct("PR0017", "Tomato"),
  createProduct("PR0018", "Chilli"),
  createProduct("PR0019", "Potato"),
  createProduct("PR0020", "Tomato"),
  createProduct("PR0021", "Chilli"),
  createProduct("PR0022", "Potato"),
  createProduct("PR0023", "Tomato"),
  createProduct("PR0024", "Chilli")
];

export default ProductData;
