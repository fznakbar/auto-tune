const { Music, User, Rating, Comment } = require(`../models`);
const createError = require(`http-errors`);

class MusicController {
	static sortedMusic(req, res, next) {
		Music.findAll({
			include: [
				{
					model: User,
					attributes: {
						exclude: `password`,
					},
				},
				{
					model: Rating,
					where: {
						like: true,
					},
					required: false,
				},
			],
			attributes: {
				exclude: `UserId`,
			},
		})
			.then((data) => {
				data.map((datum) => {
					datum.dataValues.Ratings = datum.Ratings.length;
					return datum;
				});

				data = data.sort((a, b) => b.dataValues.Ratings - a.dataValues.Ratings);
				res.status(200).json(data);
			})
			.catch(next);
	}

	static musicById(req, res, next) {
		let id = Number(req.params.id);

		Music.findOne({
			where: {
				id,
			},
			include: [
				{
					model: User,
					attributes: {
						exclude: `password`,
					},
				},
				Rating,
				Comment,
			],
			attributes: {
				exclude: `UserId`,
			},
		})
			.then((data) => {
				if (data) {
					let like = 0;
					let dislike = 0;

					data.dataValues.Ratings.forEach((i) => {
						if (i.like) {
							like++;
						} else {
							dislike++;
						}
					});

					data.dataValues.Ratings = { like, dislike };

					res.status(200).json(data);
				} else {
					throw createError(404, `Music of ID ${id} not found`);
				}
			})
			.catch(next);
	}

	static addMusic(req, res, next) {
		let { title, musicData } = req.body;
		let UserId = req.user.id;

		Music.create({ title, musicData, UserId })
			.then((data) => {
				res.status(201).json({
					title: data.title,
					musicData: data.musicData,
				});
			})
			.catch(next);
	}

	static delMusic(req, res, next) {
		let id = Number(req.params.id);

		Music.findOne({
			where: {
				id,
			},
		})
			.then((data) => {
				if (data) {
					Music.destroy({
						where: {
							id,
						},
					});

					res.status(200).json(data);
				} else {
					throw createError(404, `Music of ID ${id} not found`);
				}
			})
			.catch(next);
	}
}

module.exports = MusicController;
