const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config')

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const DB_NAME = encodeURIComponent(config.dbName);

// const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.port}/${config.dbName}?retryWrites=true&w=majority`
// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.db_host}/${DB_NAME}?retryWrites=true&w=majority`;
// const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`;
const MONGO_URI = `mongodb+srv://db_oscaruser:${config.dbPassword}@cluster0.aptay.mongodb.net/test`

class MongoLib {
	constructor() {
		this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
		this.dbName = config.dbName
		// console.log(config.dbPassword)
	}
	connect() {
		if (!MongoLib.connection) {
			MongoLib.connection = new Promise((resolve, reject) => {
				this.client.connect(err => {
					if (err) {
						reject(err);
					}
					// console.log('Connected')
					resolve(this.client.db(this.dbName));
				})
			})
		}
		return MongoLib.connection;
	}
	getAll(collection, query) {
		return this.connect().then(db => {
			return db.collection(collection).find(query).toArray()
		})
	}
	get(collection, id) {
		return this.connect().then(db => {
			return db.collection(collection).findOne({ _id: ObjectId(id) });
		})
	}
	create(collection, data) {
		return this.connect().then(db => {
			return db.collection(collection).insertOne(data);
		// }).then(result => result.ops);
		}).then(results => results.insertedId)
	}
	update(collection, id, data) {
		return this.connect().then(db => {
			return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
		}).then(results => results.updsertedId || id)

	}
	delete(collection, id) {
		return this.connect().then(db => {
			return db.collection(collection).deleteOne({ _id: ObjectId(id) });
		}).then(() => id)
	}
	validate(collection, data){
		return this.connect().then(db => {
			return db.collection(collection).find({
					"nombre": data.nombre,
					"password": data.password
				}).toArray()
		})
	}
}
module.exports = MongoLib