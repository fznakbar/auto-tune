const { User } = require(`../models`);
const createError = require(`http-errors`);
const jwt = require(`../helpers/jwt`);
const bcrypt = require(`../helpers/bcrypt`);

class UserController {
	static register(req, res, next) {
		let { username, password } = req.body;

		User.create({ username, password })
			.then((data) => {
				var token = jwt.sign({
					id: data.id,
				});

				res.status(201).json({
					token,
				});
			})
			.catch(next);
	}

	static login(req, res, next) {
		let { username, password } = req.body;

		User.findOne({
			where: {
				username,
			},
		})
			.then((data) => {
				if (data) {
					if (bcrypt.compare(password, data.password)) {
						let token = jwt.sign({
							id: data.id,
						});

						res.status(200).json({
							token,
						});
					} else {
						throw createError(400, `Wrong Username/Password`);
					}
				} else {
					throw createError(400, `Wrong Username/Password`);
				}
			})
			.catch(next);
	}
}

module.exports = UserController;
