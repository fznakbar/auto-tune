const { Comment } = require(`../models`);
const createError = require(`http-errors`);
const toxicity = require('@tensorflow-models/toxicity');

class CommentController {
	static commentById(req, res, next) {
		let id = Number(req.params.commentId);
		Comment.findOne({
			where: {
				id,
			},
		})
			.then((data) => {
				if (data) {
					res.status(200).json(data);
				} else {
					throw createError(404, `Comment of ID ${id} not found`);
				}
			})
			.catch(next);
	}

	static addComment(req, res, next) {
		let UserId = req.user.id;
		let MusicId = Number(req.params.musicId);
		let { comment } = req.body;
		toxicity.load(0.8).then((model) => {
			model
				.classify([comment])
				.then((predictions) => {
					let toxic = predictions[predictions.length - 1].results[0].match;

					if (!toxic) {
						return Comment.create({
							UserId,
							MusicId,
							comment,
						});
					} else {
						throw createError(400, `Comment is Toxic`);
					}
				})
				.then((data) => {
					res.status(201).json(data);
				})
				.catch(next);
		});
	}

	static editComment(req, res, next) {
		let id = Number(req.params.commentId);
		let { comment } = req.body;

		toxicity.load(0.8).then((model) => {
			model
				.classify([comment])
				.then((predictions) => {
					let toxic = predictions[predictions.length - 1].results[0].match;

					if (!toxic) {
						return Comment.findByPk(id);
					} else {
						throw createError(400, `Comment is Toxic`);
					}
				})

				.then((data) => {
					if (data) {
						return Comment.update(
							{
								comment,
							},
							{
								where: {
									id,
								},
								returning: true,
							}
						);
					} else {
						throw createError(404, `Comment of ID ${id} not found`);
					}
				})
				.then((data) => {
					res.status(200).json(data[0][0]);
				})
				.catch(next);
		});
	}

	static delCommment(req, res, next) {
		let id = Number(req.params.commentId);
		let returning;
		Comment.findByPk(id)
			.then((data) => {
				if (data) {
					returning = data;
					return Comment.destroy({
						where: {
							id,
						},
					});
				} else {
					throw createError(404, `Comment of ID ${id} not found`);
				}
			})
			.then((data) => {
				res.status(200).json(returning);
			})
			.catch(next);
	}
}

module.exports = CommentController;
