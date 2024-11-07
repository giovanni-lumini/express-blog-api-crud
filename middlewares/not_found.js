const not_found_middleware = (req, res, next) => {
    res.status(404).send("sorry, can't find that")
}

module.exports = not_found_middleware