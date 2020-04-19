const router = require(`express`).Router();
const { Rating } = require(`../controllers`);

router.use(require(`../middleware/authentication`));

router.put(`/like/:musicId`, Rating.like);
router.put(`/dislike/:musicId`, Rating.dislike);

router.delete(`/:musicId`, Rating.remove);

module.exports = router;
