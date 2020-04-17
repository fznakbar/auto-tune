const Model = require(`../models`)
const createError = require(`../helpers/createErrors`)


module.exports = (req, res, next) => {
    Model.Comment.findByPk(Number(req.params.id))
        .then(data => {
            if (data.UserId === req.user.id) {
                next()
            } else {
                throw createError(403, `User is not authorized to perform action`)
            }
        })
        .catch(next)
}