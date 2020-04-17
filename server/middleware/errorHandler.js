module.exports = (err, req, res, next) => {
    var status = 500
    var message = [`Internal server error`]

    switch (err.name) {
        case `NotFoundError`:
            status = 400
            message = [err.message]
            break;

        case `ForbiddenError`:
            status = 403
            message = [err.message]
            break;
    }

    status === 500 && console.log(err)

    res.status(status).json(message)
}