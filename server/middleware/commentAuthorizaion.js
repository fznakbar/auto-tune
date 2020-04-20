const { Comment } = require(`../models`);
const createError = require(`http-errors`);

module.exports = (req, res, next) => {
	Comment.findByPk(Number(req.params.commentId))
		.then((data) => {
			if (data) {
				if (data.UserId === req.user.id) {
					next();
				} else {
					throw createError(403, `User is unauthorized to perform this action`)
				}
			} else {
				throw createError(404, `Comment not Found`);
			}
		})
		.catch(next);
};
