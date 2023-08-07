function notFoundMiddleware(req, res) {
    res.status(404).send('Route DNE')
}

export default notFoundMiddleware