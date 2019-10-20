'use strict';

const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');

const transactionController = require('../transaction/transactionController').transactionObj;
const customerService = require('../../services/customerService').customerServiceObj;

const middleware = require('../../middleware/middleware');
const validator = require('../../helpers/validator');

/**
 * @class CustomerController
 */
class CustomerController {
    /**
     * 
     * @param {Object} requestData 
     * @param {Object} uid 
     * @returns {Promise}
     */
    signUp(requestData, uid) {
        return new Promise(function(resolve, reject) {
            customerService.signUp(requestData, uid)
                .then((customerID) => {
                    resolve(customerID);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    /**
     * 
     * @param {String} email 
     * @param {String} uid 
     * @returns {Promise}
     */
    customerLogin(email, uid) {
        return new Promise(function(resolve, reject) {
            customerService.customerLogin(email, uid)
                .then((customerID) => {
                    resolve(customerID);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    /**
     * 
     * @param {Object} request 
     * @param {Object} response 
     */
    makePayment(request, response) {
        let validationErr = validationResult(request);
        if (!validationErr.isEmpty()) {
            console.log(validationErr);
            response.status(400).json({
                success: false,
                data: 'Invalid parameters'
            });
        } else {
            transactionController.addTransaction(request.body)
                .then((data) => {
                    response.status(201).json({
                        success: true,
                        data: data
                    });
                })
                .catch((error) => {
                    response.status(500).json({
                        success: false,
                        data: error.message
                    });
                });
        }
    }
}

const customerObj = new CustomerController();

router.post('/payment', validator.paymentValidation,
            middleware.authorizeUser, customerObj.makePayment);

module.exports.customerObj = customerObj;
module.exports.router = router;
