const { Comment } = require(`../models`);
const createError = require(`http-errors`);

class CommentController {
	static commentById(req, res, next) {
		let id = Number(req.params.commentId);
		Comment.findOne({
			where: {
				id,
			},
		})
			.then((data) => {
                if(data) {
                    res.status(200).json(data);
                } else {
                    throw createError(404, `Comment of ID ${id} not found`)
                }
			})
			.catch(next);
	}

	static addComment(req, res, next) {
		let UserId = req.user.id;
		let MusicId = Number(req.params.musicId);
		let { comment } = req.body;
		Comment.create({
			UserId,
			MusicId,
			comment,
		})
			.then((data) => {
				res.status(201).json(data);
			})
			.catch(next);
	}

	static editComment(req, res, next) {
		let id = Number(req.params.commentId);
		Comment.findByPk(id)
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
				res.status(200).json(data);
			})
			.catch(next);
	}

	static delCommment(req, res, next) {
		let id = Number(req.params.commentId);
		Comment.findByPk(id)
			.then((data) => {
				if (data) {
					var returning = data;
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
