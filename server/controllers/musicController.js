const { Music, User } = require(`../models`);

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

	static musicById(req, res, next) {}

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

	static delMusic(req, res, next) {}
}

module.exports = MusicController;
