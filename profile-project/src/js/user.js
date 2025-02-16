export default class User {
    constructor(fullName, username, email, password) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = "client";
        this.bio = "";
        this.createdAt;
    }
}