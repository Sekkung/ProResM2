// To parse this data:
//
//   import { Convert } from "./file";
//
//   const food = Convert.toFood(json);

export interface FoodOrder {
  oid:    number;
  name:   string;
  price:  number;
  amount: number;
  sumPrice: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toFoodOrder(json: string): FoodOrder[] {
      return JSON.parse(json);
  }

  public static FoodOrderToJson(value: FoodOrder[]): string {
      return JSON.stringify(value);
  }
}
