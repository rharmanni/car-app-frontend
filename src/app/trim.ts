import {Model} from "./model";

export interface Trim {
  id: number;
  name: string;
  engine: string;
  transmission: string;
  bodyStyle: string;
  yearBuilt: number;
  imageUrl: string;
  model: Model;
}
