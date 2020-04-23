const router = require(`express`).Router();

router.get(`/`, (req, res, next) => {
	res.status(200).json(`home`);
});

router.use(`/users`, require(`./userRoutes`));
router.use(`/musics`, require(`./musicRoutes`));

module.exports = router;
