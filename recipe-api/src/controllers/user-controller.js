const s3 = require('../middleware/s3Client')

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.fetchUserPhoto = async (req, res) => {
    return await s3.fetch(res, 'hunger-roulette', req.params.key)
}