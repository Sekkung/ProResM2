// To parse this data:
//
//   import { Convert } from "./file";
//
//   const food = Convert.toFood(json);

export interface Consistof {
  oid:      number;
  fid:      number;
  amount:   number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toConsistof(json: string): Consistof[] {
      return JSON.parse(json);
  }

  public static ConsistofToJson(value: Consistof[]): string {
      return JSON.stringify(value);
  }
}
