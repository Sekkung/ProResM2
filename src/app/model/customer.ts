// To parse this data:
//
//   import { Convert } from "./file";
//
//   const food = Convert.toFood(json);

export interface Customer {
  cid:        number;
  name:       string;
  money:      number;
  phone:      string;
  address:    string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCustomer(json: string): Customer[] {
      return JSON.parse(json);
  }

  public static CustomerToJson(value: Customer[]): string {
      return JSON.stringify(value);
  }
}
