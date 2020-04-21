const router = require(`express`).Router();
const { User } = require(`../controllers`);

router.get(`/:id`, User.getUser);
router.post(`/register`, User.register);
router.post(`/login`, User.login);

module.exports = router;
