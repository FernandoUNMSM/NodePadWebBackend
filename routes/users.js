const express = require('express');
const UsersServices = require('../services/users');

const cors = require('cors');

let multer = require('multer');
let upload = multer();
// const { usersMock } = require('../utils/users')

function usersApp(app) {
	const router = express.Router()
	app.use(cors())
	app.use("/api/users", router)
	const userService = new UsersServices()

	router.get("/", async function (req, res, next) {
		// res.setHeader('Access-Control-Allow-Origin', '*');
		const { tags } = req.query;
		try {
			const users = await userService.getUsers({ tags });
			res.status(200).json({
				data: users,
				message: 'users listed'
			});
		} catch (err) {
			next(err)
		}
	})
	router.get("/:id", async function (req, res, next) {
		// res.setHeader('Access-Control-Allow-Origin', '*');
		const { id } = req.params;
		try {
			const users = await userService.getUser(id);
			res.status(200).json({
				data: users,
				message: 'user retrieved'
			});
		} catch (err) {
			next(err)
		}
	})
	router.post("/login", upload.fields([]), async function (req, res, next) {
		res.setHeader('Content-Type', 'application/json')
		// console.log(req.body)
		// res.setHeader('Access-Control-Allow-Origin', '*');
		try {
			const validate = await userService.validateUser(req.body);
			if(validate === true){
				res.status(201).json({
					jwt: validate
				})
			}else{
				res.send(401)
			}
			// res.status(200).json({
			// 	data: validate,
			// 	message: 'user validate'
			// });
		} catch (err) {
			next(err)
		}
	})

	router.post("/", upload.fields([]), async function (req, res, next) {
		res.setHeader('Content-Type', 'application/json')
		// res.setHeader('Access-Control-Allow-Origin', '*');
		// const {body: user} = req.body;
		try {
			const createUserId = await userService.createUser(req.body);
			console.log(createUserId)
			res.status(201).json({
				jwt: (createUserId) ? true : false
			})
			// res.status(201).json({
			// 	data: createUserId,
			// 	message: 'user created'
			// });
		} catch (err) {
			next(err)
		}
	})
	router.put("/:id", upload.fields([]), async function (req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		// res.setHeader('Access-Control-Allow-Origin', '*');
		// console.log(req.body)
		const { id } = req.params;
		try {
			const updateduserId = await userService.updateUser(id, req.body);
			res.status(200).json({
				data: updateduserId,
				message: 'user updated'
			});
		} catch (err) {
			next(err)
		}
	})
	router.delete("/:id", async function (req, res, next) {
		// res.setHeader('Access-Control-Allow-Origin', '*');
		const { id } = req.params;

		try {
			const deleteUserId = await userService.deleteUser({ id });

			res.status(200).json({
				data: deleteUserId,
				message: 'user deleted'
			});
		} catch (err) {
			next(err)
		}
	})
}

module.exports = usersApp;