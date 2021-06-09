const PlayedTarget = require('../models/playedTarget.model');

// Handle get score from playedTarget
exports.getScore = (req, res) => {
    PlayedTarget.findById(req.params.playedTarget_id, (err, playedTarget) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (Object.keys(playedTarget['score']).includes(req.params.score_id)) {
                res.status(200).sendData(JSON.stringify({
                    message: 'PlayedTarget score loading..',
                    data: playedTarget['score'][req.params.score_id],

                }));
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This score does not exist in this playedTarget",
                });
            }

        }
    });
};

// Handle get score from playedTarget
exports.getScores = (req, res) => {
    PlayedTarget.findById(req.params.playedTarget_id, (err, playedTarget) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.status(200).sendData(JSON.stringify({
                message: 'PlayedTarget score loading..',
                data: playedTarget['score'],
            }));
        }
    });
};

// Handle get specfic scoretag from playedTarget
exports.getScoreTag = (req, res) => {
    PlayedTarget.findById(req.params.playedTarget_id, (err, playedTarget) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (Object.keys(playedTarget['score']).includes(req.params.score_id)) {
                if (Object.keys(playedTarget['score'][req.params.score_id]['tag']).includes(req.params.tag_id)) {
                    res.status(200).sendData(JSON.stringify({
                        message: 'PlayedTarget details loading..',
                        data: playedTarget['score'][req.params.score_id]['tag'][req.params.tag_id],
                    }));
                }
                else {
                    res.status(400).json({
                        status: 'error',
                        error: "This tag does not exist in this score",
                    });
                }
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This score does not exist in this playedTarget",
                });
            }

        }
    });
};

// Handle get scoretags from playedTarget
exports.getScoreTags = (req, res) => {
    PlayedTarget.findById(req.params.playedTarget_id, (err, playedTarget) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (Object.keys(playedTarget['score']).includes(req.params.score_id)) {
                res.status(200).sendData(JSON.stringify({
                    message: 'PlayedTarget details loading..',
                    data: playedTarget['score'][req.params.score_id]['tag'],
                }));
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This score does not exist in this playedTarget",
                });
            }

        }
    });
};