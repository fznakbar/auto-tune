const router = require(`express`).Router();
const { Music } = require(`../controllers`);

router.get(`/`, Music.sortedMusic);
router.get(`/:id`, Music.musicById);
router.post(`/add`, Music.addMusic);

router.use(require(`../middleware/musicAuthorizaion`));

router.delete(`/:id`, Music.delMusic);

module.exports = router;
