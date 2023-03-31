// To parse this data:
//
//   import { Convert } from "./file";
//
//   const foodtype = Convert.toFoodtype(json);

export interface Foodtype {
  tid:  number;
  name: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toFoodtype(json: string): Foodtype[] {
      return JSON.parse(json);
  }

  public static foodtypeToJson(value: Foodtype[]): string {
      return JSON.stringify(value);
  }
}
