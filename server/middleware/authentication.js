const jwt = require(`../helpers/jwt`)
const createError = require(`../helpers/createErrors`)
const Model = require(`../models`)

module.exports = (req, res, next) => {
    var { token } = req.headers

    try {
        req.user = jwt.jwtVerify(token)

        Model.User.findOne({
            where: {
                id: req.user.id
            }
        })
            .then(data => {
                if (data) {
                    next()
                } else {
                    throw createError(404, `User not found`)
                }
            })
    } catch (err) {
        next(err)
    }
}