export class AuthLoginData {
    username: string;
    password: string;

    constructor(un:string, pass: string) {
        this.username = un;
        this.password = pass;
    }
}