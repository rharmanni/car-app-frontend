import {Model} from "./model";

export interface Brand {
  id: number;
  name: string;
  country: string;
  dateFounded: number;
  imageUrl: string;
  models: Model[];
}
