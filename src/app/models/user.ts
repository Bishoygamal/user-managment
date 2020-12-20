export class User {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar:string
  token: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
