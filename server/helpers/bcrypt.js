const bcrypt = require(`bcrypt`);
const saltRounds = 10;

module.exports = {
	hash(password) {
		return bcrypt.hashSync(password, saltRounds);
    },
    
    compare(password, hashed) {
        return bcrypt.compareSync(password, hashed)
    }
};
