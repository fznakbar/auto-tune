const router = require(`express`).Router();
const users = require(`./userRoutes`);
const musics = require(`./musicRoutes`);
const rates = require(`./ratingRoutes`);

router.get(`/`, (req, res, next) => {
	res.status(200).json(`home`);
});

router.use(`/users`, users);
router.use(`/musics`, musics);
router.use(`/rates`, rates);

module.exports = router;
