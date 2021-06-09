const Location = require('../models/location.model');
const Target = require('../models/target.model');

//handle view scores from linked target
exports.getScores = (req, res) => {
    Location.findById(req.params.location_id, (err, location) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (location['targets'].includes(req.params.target_id)) {
                Target.findById(req.params.target_id, (err, target) => {
                    if (err) {
                        res.status(400).json({
                            status: 'error',
                            error: err,
                        });
                    } else {
                        res.status(200).sendData(JSON.stringify({
                            message: 'Target score loading..',
                            data: target['score'],
                        }));
                    }
                });
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This target does not exist in this location",
                });
            }
        }
    });
};

// Handle view specific score from linked target
exports.getScore = (req, res) => {
    Location.findById(req.params.location_id, (err, location) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (location['targets'].includes(req.params.target_id)) {
                Target.findById(req.params.target_id, (err, target) => {
                    if (err) {
                        res.status(400).json({
                            status: 'error',
                            error: err,
                        });
                    } else {
                        if (Object.keys(target['score']).includes(req.params.score_id)) {
                            res.status(200).sendData(JSON.stringify({
                                message: 'Target details loading..',
                                data: target['score'][req.params.score_id],
                            }));
                        }
                        else {
                            res.status(400).json({
                                status: 'error',
                                error: "This score does not exist in this target",
                            });
                        }
                    }
                });
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This target does not exist in this location",
                });
            }
        }
    });
};

//Handle view specific scoretag from linked target score
exports.getScoreTag = (req, res) => {
    Location.findById(req.params.location_id, (err, location) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (location['targets'].includes(req.params.target_id)) {
                Target.findById(req.params.target_id, (err, target) => {
                    if (err) {
                        res.status(400).json({
                            status: 'error',
                            error: err,
                        });
                    } else {
                        if (Object.keys(target['score']).includes(req.params.score_id)) {
                            if (Object.keys(target['score'][req.params.score_id]['tag']).includes(req.params.tag_id)) {
                                res.status(200).sendData(JSON.stringify({
                                    message: 'Target details loading..',
                                    data: target['score'][req.params.score_id]['tag'][req.params.tag_id],
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
                                error: "This score does not exist in this target",
                            });
                        }
                    }
                });
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This target does not exist in this location",
                });
            }
        }
    });
};

//Handle view scoretags from linked target score
exports.getScoreTags = (req, res) => {
    Location.findById(req.params.location_id, (err, location) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            if (location['targets'].includes(req.params.target_id)) {
                Target.findById(req.params.target_id, (err, target) => {
                    if (err) {
                        res.status(400).json({
                            status: 'error',
                            error: err,
                        });
                    } else {
                        if (Object.keys(target['score']).includes(req.params.score_id)) {
                            res.status(200).sendData(JSON.stringify({
                                message: 'Target details loading..',
                                data: target['score'][req.params.score_id]['tag'],
                            }));
                        }
                        else {
                            res.status(400).json({
                                status: 'error',
                                error: "This score does not exist in this target",
                            });
                        }
                    }
                });
            }
            else {
                res.status(400).json({
                    status: 'error',
                    error: "This target does not exist in this location",
                });
            }
        }
    });
};