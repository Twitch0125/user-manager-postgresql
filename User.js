class User {
  constructor(id = "", name = "", email = "", age = 0) {
    (this.id = id), (this.name = name), (this.email = email), (this.age = age);
  }
}
module.exports = User;
