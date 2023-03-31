// To parse this data:
//
//   import { Convert } from "./file";
//
//   const customerLogin = Convert.toCustomerLogin(json);

export interface CustomerLogin {
  cid:      number;
  name:     string;
  password: string;
  money:    number;
  phone:    number;
  address:  string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCustomerLogin(json: string): CustomerLogin[] {
      return JSON.parse(json);
  }

  public static customerLoginToJson(value: CustomerLogin[]): string {
      return JSON.stringify(value);
  }
}
