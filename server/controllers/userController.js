const { User, Comment, Music, Rating } = require(`../models`);
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

	static getUser(req, res, next) {
		let id = Number(req.params.id);

		User.findByPk(id, {
			attributes: {
				exclude: `password`,
			},
			include: [
				{
					model: Music,
					attributes: {
						exclude: `UserId`,
					},
				},
				{
					model: Comment,
					attributes: {
						exclude: [`UserId`, `MusicId`],
					},
					include: [
						{
							model: Music,
							attributes: {
								exclude: `UserId`
							},
							include: [
								{
									model: User,
									attributes: {
										exclude: `password`
									}
								}
							]
						}
					],
				},
				{
					model: Rating,
					attributes: {
						exclude: [`UserId`, `MusicId`]
					},
					include: [
						{
							model: Music,
							attributes: {
								exclude: `UserId`
							},
							include: [
								{
									model: User,
									attributes: {
										exclude: `password`
									}
								}
							]
						}
					]
				}
			],
		})
			.then((data) => {
				res.status(200).json(data);
			})
			.catch(next);
	}
}

module.exports = UserController;
