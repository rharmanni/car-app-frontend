import {Trim} from "./trim";
import {Brand} from "./brand";

export interface Model {
  id: number;
  name: string;
  generation: number;
  yearIntroduction: number;
  yearDiscontinued: number;
  imageUrl: string;
  trims: Trim[];
  brand: Brand;
}
