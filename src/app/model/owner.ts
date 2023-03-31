// To parse this data:
//
//   import { Convert } from "./file";
//
//   const food = Convert.toFood(json);

export interface Owner {
  oid:        number;
  name:       string;
  username:   string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOwner(json: string): Owner[] {
      return JSON.parse(json);
  }

  public static OwnerToJson(value: Owner[]): string {
      return JSON.stringify(value);
  }
}
