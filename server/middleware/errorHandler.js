module.exports = (err, req, res, next) => {
	var status = 500;
	var message = [`Internal server error`];

	switch (err.name) {
		case `NotFoundError`:
			status = 404;
			message = err.message;
			break;

		case `BadRequestError`:
			status = 400;
			message = err.message;
			break;

		case `ForbiddenError`:
			status = 403;
			message = err.message;
			break;

		case `SequelizeUniqueConstraintError`:
			status = 400;
			message = [`Username is already used`];
			break;
	}

	status === 500 && console.log(err.stack, `\n\n\n\n\n`);

	res.status(status).json(message);
};
