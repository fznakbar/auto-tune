const { Music, User } = require(`../models`);
const createError = require(`http-errors`);

class MusicController {
	static sortedMusic(req, res, next) {
		Music.findAll({
			include: [User],
		})
			.then((data) => {
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
		})
			.then((data) => {
				if (data) {
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
