// const { usersMock } = require('../utils/users')
const MongoLib = require('../lib/mongo')

class UsersServices {
    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib()
    }
    async getUsers({tags}) {
        const query = tags && { tags: {$in: tags}}
        const users = await this.mongoDB.getAll(this.collection, query);
        return users || [];
    }
    async getUser(userId) {
        // console.log(userId.id)
        const user = await this.mongoDB.get(this.collection, userId.id);
        return user || {};
    }
    async createUser(user) {
        // console.log(user)
        const createUserId = await this.mongoDB.create(this.collection, user);
        return createUserId;
    }
    async updateUser(userId, user) {
        const updateUserId = await this.mongoDB.update(this.collection, userId, user);
        return updateUserId;
    }
    async deleteUser(userId) {
        // console.log(userId)
        const deleteUserId = await this.mongoDB.delete(this.collection, userId.id);
        return deleteUserId;
    }
}
module.exports = UsersServices;
