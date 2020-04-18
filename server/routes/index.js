const router = require(`express`).Router();
const users = require(`./userRoutes`);
const musics = require(`./musicRoutes`);

router.get(`/`, (req, res, next) => {
	res.status(200).json(`home`);
});

router.use(`/users`, users);
router.use(`/musics`, musics);

module.exports = router;
