'use strict';

const jwt = require('jsonwebtoken');

/**
 * @class Middleware
 */
class Middleware {
    /**
     * 
     * @param {Object} request 
     * @param {Object} response 
     * @param {Object} next 
     */
    authorizeUser(request, response, next) {
        if (request.headers.hasOwnProperty('authorization')) {
            let accessToken = request.headers.authorization.replace('Bearer ', '');
            let userID;
            if(request.method == 'GET') {
                userID = request.query.customer_id ? request.query.customer_id :
                request.query.admin_id;
            } else {
                userID = request.body.customer_id ? request.body.customer_id :
                request.body.admin_id;
            }
            jwt.verify(accessToken, process.env.JWT_SECRET, function(err, decoded) {
                let decodedID = decoded.customer_id ? decoded.customer_id : decoded.admin_id;
                if (!err && userID == decodedID) {
                    // Token verified successfully
                    next();
                } else {
                    response.status(401).json({
                        success: false,
                        data: 'Token authentication failed'
                    });
                }
            });
        } else {
            response.status(401).json({
                success: false,
                data: 'Token is not present in the request'
            });;
        }
    }
}

let middlewareObj = new Middleware();

module.exports = middlewareObj;
