export class UserModel {
    uid: string;
    email: string;
    password: string;
    username?: string;

    constructor(uid: string, email: string, password: string, username?: string) {
        this.uid = uid;
        this.email = email;
        this.password = password;
        this.username = username;
    }
}