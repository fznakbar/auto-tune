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
				Rating,
			],
			attributes: {
				exclude: `UserId`,
			},
		})
			.then((data) => {
				let like = 0;
				let dislike = 0;

				data.forEach((i) => {
					i.dataValues.Ratings.forEach((o) => {
						if (o.like) {
							like++;
						} else {
							dislike++;
						}
					});

					i.dataValues.Ratings = { like, dislike };
				});

				data = data.sort(
					(a, b) => b.dataValues.Ratings.like - a.dataValues.Ratings.like
				);
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
				{
					model: Comment,
					attributes: {
						exclude: [`MusicId`, `UserId`],
					},
					include: [
						{
							model: User,
							attributes: {
								exclude: [`password`],
							},
						},
					],
				},
			],
			attributes: {
				exclude: `UserId`,
			},
		})
			.then((data) => {
				if (data) {
					let like = [];
					let dislike = [];

					data.dataValues.Ratings.forEach((i) => {
						if (i.like) {
							like.push(i);
						} else {
							dislike.push(i);
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
