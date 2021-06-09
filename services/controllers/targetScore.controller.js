const Target = require('../models/target.model');
const fs = require('fs');
const target = require('../models/target.model');

// Handle get score from target
exports.getScore = (req, res) => {
    Target.findById(req.params.target_id, (err, target) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (Object.keys(target['score']).includes(req.params.score_id)) {
                res.status(200).sendData(JSON.stringify({
                    message: 'Target details loading..',
                    data: target['score'][req.params.score_id],
                }))
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This score does not exist in this target",
                });
            }

        }
    });
};

// Handle get scores from target
exports.getScores = (req, res) => {
    Target.findById(req.params.target_id, (err, target) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.status(200).sendData(JSON.stringify({
                message: 'Target details loading..',
                data: target['score'],

            }))
        }
    });
};

// Handle get specific scoretag from target
exports.getScoreTag = (req, res) => {
    Target.findById(req.params.target_id, (err, target) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (Object.keys(target['score']).includes(req.params.score_id)) {
                if (Object.keys(target['score'][req.params.score_id]['tag']).includes(req.params.tag_id)) {
                    res.status(200).sendData(JSON.stringify({
                        message: 'Target details loading..',
                        data: target['score'][req.params.score_id]['tag'][req.params.tag_id],
                    }))
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
                    error: "This score does not exist in this target",
                });
            }

        }
    });
};

// Handle get scoretag from target
exports.getScoreTags = (req, res) => {
    Target.findById(req.params.target_id, (err, target) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (Object.keys(target['score']).includes(req.params.score_id)) {
                res.status(200).sendData(JSON.stringify({
                    message: 'Target details loading..',
                    data: target['score'][req.params.score_id]['tag'],
                }))
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This score does not exist in this target",
                });
            }

        }
    });
};