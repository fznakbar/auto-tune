const { Comment } = require(`../models`);
const createError = require(`http-errors`);

module.exports = (req, res, next) => {
	Comment.findByPk(Number(req.params.commentId))
		.then((data) => {
			if (data.UserId === req.user.id) {
				next();
			} else {
				throw createError(403, `User is not authorized to perform action`);
			}
		})
		.catch(next);
};
