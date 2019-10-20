'use strict';

const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');

const adminService = require('../../services/adminService').adminServiceObj;
const clientController = require('../client/clientController').clientObj;
const transactionController = require('../transaction/transactionController').transactionObj;

const middleware = require('../../middleware/middleware');
const validator = require('../../helpers/validator');

/**
 * @class AdminController
 */
class AdminController {
    /**
     * 
     * @param {String} email 
     * @param {String} uid 
     * @returns {Promise}
     */
    adminLogin(email, uid) {
        return new Promise((resolve, reject) => {
            adminService.adminLogin(email, uid)
                .then((adminID) => {
                    resolve(adminID);
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
    getClients(request, response) {
        let validationErr = validationResult(request);
        if (!validationErr.isEmpty()) {
            console.log(validationErr);
            response.status(400).json({
                success: false,
                data: 'Invalid parameters'
            });
        } else {
            clientController.getClients()
                .then((clientList) => {
                    response.status(200).json({
                        success: true,
                        data: clientList
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
    /**
     * 
     * @param {Object} request 
     * @param {Object} response 
     */
    viewTransaction(request, response) {
        let validationErr = validationResult(request);
        if (!validationErr.isEmpty()) {
            console.log(validationErr);
            response.status(400).json({
                success: false,
                data: 'Invalid parameters'
            });
        } else {
            transactionController.viewTransaction(request.query.client_id)
                .then((transactions) => {
                    response.status(200).json({
                        success: true,
                        data: transactions
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

const adminObj = new AdminController();

router.get('/client', validator.adminValidation,
            middleware.authorizeUser, adminObj.getClients);
router.get('/transaction', validator.adminTransValidation,
            middleware.authorizeUser, adminObj.viewTransaction);

module.exports.adminObj = adminObj;
module.exports.router = router;