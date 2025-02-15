export class Validation {

  public static ValidateUser(fullname: string, email: string, password: string): void {

    if(!email || !fullname || !password) {
      throw new Error("Requested data can not be empty.");
    }

    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isvalidemail: boolean = emailPattern.test(email);

    if(!isvalidemail) {
      throw new Error("Invalid email format")
    }
  }

}