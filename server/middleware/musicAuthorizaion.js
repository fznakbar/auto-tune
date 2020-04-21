const { Music } = require(`../models`);
const createError = require(`http-errors`);

module.exports = (req, res, next) => {
	Music.findByPk(Number(req.params.id))
		.then((data) => {
			if (data) {
				if (data.UserId === req.user.id) {
					next();
				} else {
					throw createError(403, `User is not authorized to perform action`);
				}
			} else {
				throw createError(404, `Music not found`)
			}
		})
		.catch(next);
};
