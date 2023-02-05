const s3 = require('../middleware/s3Client')

exports.getImage = async (req, res) => {
    try {
        console.log(req.params.key)
        return await s3.fetch(res, "hunger-roulette", req.params.key)
    } catch (err) {
        res.sendStatus(404)
    }
}