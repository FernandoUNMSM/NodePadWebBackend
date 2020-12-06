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
        // console.log(userId)
        const user = await this.mongoDB.get(this.collection, userId);
        return user || {};
    }
    async createUser(user) {
        // console.log(user)
        const createUserId = await this.mongoDB.create(this.collection, user);
        return createUserId;
    }
    async updateUser(userId, user) {
        const updateUserId = await this.mongoDB.update(this.collection, userId, user);
        return this.getUser(updateUserId)
            .then(res => res)
        // return updateUserId;
    }
    async deleteUser(userId) {
        // console.log(userId)
        const deleteUserId = await this.mongoDB.delete(this.collection, userId.id);
        return deleteUserId;
    }
    async validateUser(user) {
        const validate = await this.mongoDB.validate(this.collection, user)
        // console.log(validate)
        return (Object.keys(validate)[0] === '0')
        ? {validate, 'valid': true}
        : false
    }
}
module.exports = UsersServices;
