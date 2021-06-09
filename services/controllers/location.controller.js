const Location = require('../models/location.model');

exports.index = (req, res) => {
    //Create filter if query has valid filter-options
    let queryItems = (Object.keys(req.query));
    let filter = {};
    for (let i = 0; i < queryItems.length; i++) {
        const curItem = queryItems[i];
        //check for valid filters
        if (curItem == 'locationName' || curItem == 'long' || curItem == 'range' || curItem == 'lat') {
            filter[curItem] = req.query[curItem];
        }
    }
    Location.find(filter, (err, location) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: err,
            });
        } else {
            const totalSize = location.length;
            res.status(200).sendData(JSON.stringify({
                status: 'success',
                message: 'Location retrieved successfully',
                data: location,
                totalSize: totalSize,
            }));;
        }
    });
};

// Handle update location info
exports.update = (req, res) => {
    Location.findByIdAndUpdate(
        req.params.location_id,
        req.body,
        { new: true, runValidators: true },
        (err, location) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                res.status(200).sendData(JSON.stringify({
                    message: 'Location Info updated',
                    data: location,
                }));
            }
        },
    );
};

// Handle create Location actions
exports.new = (req, res) => {
    const location = new Location();
    const LocationObj = req.body;
    Object.keys(LocationObj).forEach((key) => {
        location[key] = LocationObj[key];
    });
    // save the Location and check for errors
    location.save((LocationError) => {
        if (LocationError) {
            res.status(400).json({
                status: 'error',
                error: LocationError,
            });
        }
        else {
            res.status(201).json({
                message: 'New Location created!',
                data: location,
            });
        }
    });
};

// Handle view Location info
exports.view = (req, res) => {
    Location.findById(req.params.location_id, (err, location) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.status(200).sendData(JSON.stringify({
                message: 'Location details loading..',
                data: location,
            }));
        }
    });
};

// Handle get location
exports.getLocation = (req, res) => {
    Location.findById(req.params.location_id, (err, location) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.status(200).sendData(JSON.stringify({
                message: 'Target details loading..',
                data: target,
            }));
        }
    });
};