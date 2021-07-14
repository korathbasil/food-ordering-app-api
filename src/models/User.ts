import getDb from "../config/dbConnection";

export default class User {
  email: string;
  name: string;
  password: string;

  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  signup() {
    getDb()
      ?.collection("users")
      .insertOne({
        email: this.email,
        name: this.name,
        password: this.password,
      })
      .then((user) => console.log(user));
  }
}
