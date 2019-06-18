class UserData{
    constructor(){
        this.users = []
    }
    addUser(userObject){
        this.users.push(userObject);
    }
    removeUser(userObject){
        this.users = this.users.filter(user => user != userObject);
    }
}

module.exports = UserData