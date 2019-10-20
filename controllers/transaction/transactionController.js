'use strict';

const transactionService = require('../../services/transactionService').transactionServiceObj;

/**
 * @class TransactionController
 */
class TransactionController {
    /**
     * 
     * @param {Object} requestData 
     * @returns {Promise}
     */
    addTransaction(requestData) {
        return new Promise((resolve, reject) => {
            transactionService.addTransaction(requestData)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    /**
     * 
     * @param {Object} requestData 
     * @returns {Promise}
     */
    viewTransaction(clientID) {
        return new Promise((resolve, reject) => {
            transactionService.viewTransaction(clientID)
                .then((transactions) => {
                    resolve(transactions);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

const transactionObj = new TransactionController();

module.exports.transactionObj = transactionObj;
