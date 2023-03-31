export interface Order {
  oid:  number;
  cid:  number;
  cusName:  string;
  cusPhone: string;
  status:   string;
  address:  string;
  fdate:    string;
  odate:    string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrder(json: string): Order[] {
      return JSON.parse(json);
  }

  public static orderToJson(value: Order[]): string {
      return JSON.stringify(value);
  }
}
