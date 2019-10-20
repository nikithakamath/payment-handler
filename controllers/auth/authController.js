'use strict';

const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

let validator = require('../../helpers/validator');
let customerObj = require('../customer/customerController').customerObj;
let adminObj = require('../admin/adminController').adminObj;
let firebaseAuth = require('../../services/firebase/auth');

/**
 * @class AuthController
 */
class AuthController {
    /**
     * 
     * @param {Object} request 
     * @param {Object} response 
     */
    signUp(request, response) {
        let validationErr = validationResult(request);
        if (!validationErr.isEmpty()) {
            response.status(400).json({
                success: false,
                data: 'Invalid parameters'
            });
        } else {
            firebaseAuth.verifyUserAuth(request.headers)
                .then((uid) => {
                    return customerObj.signUp(request.body, uid);
                })
                .then((customerID) => {
                    let token = jwt.sign({
                        customer_id: customerID,
                        iat: Math.floor(Date.now() / 1000)
                    }, process.env.JWT_SECRET);
                    let result = {
                        customer_id: customerID,
                        accessToken: token
                    };
                    response.status(201).json({
                        success: true,
                        data: result
                    });
                })
                .catch((error) => {
                    response.status(400).json({
                        success: false,
                        data: error.message
                    });
                });
        }
    }
    /**
     * 
     * @param {Object} request 
     * @param {Object} response 
     */
    login(request, response) {
        let validationErr = validationResult(request);
        if (!validationErr.isEmpty()) {
            response.status(400).json({
                success: false,
                data: 'Invalid parameters'
            });
        } else {
            firebaseAuth.verifyUserAuth(request.headers)
                .then((uid) => {
                    if(request.body.isAdmin) {
                        return adminObj.adminLogin(request.body.email, uid);
                    } else {
                        return customerObj.customerLogin(request.body.email, uid);
                    }
                })
                .then((userID) => {
                    let token, result;
                    if(request.body.isAdmin) {
                        token = jwt.sign({
                            admin_id: userID,
                            iat: Math.floor(Date.now() / 1000)
                        }, process.env.JWT_SECRET);
                        result = {
                            admin_id: userID,
                            accessToken: token
                        };
                    } else {
                        token = jwt.sign({
                            customer_id: userID,
                            iat: Math.floor(Date.now() / 1000)
                        }, process.env.JWT_SECRET);
                        result = {
                            customer_id: userID,
                            accessToken: token
                        };
                    }
                    response.status(200).json({
                        success: true,
                        data: result
                    });
                })
                .catch((error) => {
                    response.status(403).json({
                        success: false,
                        data: error.message
                    });
                });
        }
    }
}

let authObject = new AuthController();

router.post('/signup', validator.signupValidation, authObject.signUp);
router.post('/login', validator.loginValidation, authObject.login);

module.exports.router = router;
