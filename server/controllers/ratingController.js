const { Rating } = require(`../models`);

class RatingController {
	static like(req, res, next) {
		let UserId = req.user.id;
		let MusicId = Number(req.params.musicId);
		let like = true;

		Rating.findOne({
			where: {
				UserId,
				MusicId,
			},
		})
			.then((data) => {
				if (data) {
					return Rating.update(
						{
							like,
						},
						{
							where: {
								UserId,
								MusicId,
							},
						}
					);
				} else {
					return Rating.create({
						UserId,
						MusicId,
						like,
					});
				}
			})
			.then((data) => {
				res.status(204).json();
			})
			.catch(next);
	}

	static dislike(req, res, next) {
		let UserId = req.user.id;
		let MusicId = Number(req.params.musicId);
		let like = false;

		Rating.findOne({
			where: {
				UserId,
				MusicId,
			},
		})
			.then((data) => {
				if (data) {
					return Rating.update(
						{
							like,
						},
						{
							where: {
								UserId,
								MusicId,
							},
						}
					);
				} else {
					return Rating.create({
						UserId,
						MusicId,
						like,
					});
				}
			})
			.then((data) => {
				res.status(204).json();
			})
			.catch(next);
	}

	static remove(req, res, next) {
		let UserId = req.user.id;
		let MusicId = Number(req.params.musicId);

		Rating.destroy({
			where: {
				UserId,
				MusicId,
			},
		})
			.then((data) => {
				res.status(204).json();
			})
			.catch(next);
	}
}

module.exports = RatingController;
