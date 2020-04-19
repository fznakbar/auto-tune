const router = require(`express`).Router();
const { Comment } = require(`../controllers`);

router.get(`/:musicId`, Comment.commentById);

router.use(require(`../middleware/authentication`));
router.post(`/:musicId`, Comment.addComment);

router.use(require(`../middleware/commentAuthorizaion`));
router.put(`/:commentId`, Comment.editComment);
router.delete(`/:commentId`, Comment.delCommment);

module.exports = router;
