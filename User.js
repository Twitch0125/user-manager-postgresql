class User {
  constructor(id = "", username="",name = "", email = "", age = 0) {
    (this.id = id), (this.username=username),(this.name = name), (this.email = email), (this.age = age);
  }
}
module.exports = User;
