export interface Oid {
  oid:  number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOid(json: string): Oid[] {
      return JSON.parse(json);
  }

  public static OidToJson(value: Oid[]): string {
      return JSON.stringify(value);
  }
}
