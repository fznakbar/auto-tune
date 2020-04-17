const jwt = require(`jsonwebtoken`);
const secret = process.env.JWT_SECRET;

module.exports = {
	sign(payload) {
		try {
			var token = jwt.sign(payload, secret);
		} catch (error) {
			next(error);
		}

		return token;
	},

	verify(token) {
		try {
			var decoded = jwt.verify(token, secret);
		} catch (error) {
			next(error);
		}

		return decoded;
	},
};
