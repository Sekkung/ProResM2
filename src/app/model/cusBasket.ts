// To parse this data:
//
//   import { Convert } from "./file";
//
//   const food = Convert.toFood(json);

export interface CusBasket {
  oid:    number;
  fid:    number;
  name:   string;
  price:  number;
  amount: number;
  sumPrice: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCusBasket(json: string): CusBasket[] {
      return JSON.parse(json);
  }

  public static CusBasketToJson(value: CusBasket[]): string {
      return JSON.stringify(value);
  }
}
