'use strict';

const {TRANSACTION_TABLE} = require('../../helpers/constant');
const connection = require('../connection').connection;

/**
 * @class TransactionModel
 */
class TransactionModel {
    /**
     * 
     * @param {Object} transactionDetails
     * @returns {Promise}
     */
    addTransaction(transactionDetails) {
        return new Promise((resolve, reject) => {
            let query = `insert into ${TRANSACTION_TABLE} set ?`;
            connection.query(query, transactionDetails, function (error, results) {
                if(error) {
                    reject(error);
                } else {
                   resolve(results.insertId);
                }
            });
        });
    }
    /**
     * 
     * @param {Number} clientID 
     * @returns {Promise}
     */
    viewTransaction(clientID) {
        return new Promise((resolve, reject) => {
            let query = `select * from ${TRANSACTION_TABLE} where client_id=?`;
            connection.query(query, clientID, function (error, results) {
                if(error) {
                    reject(error);
                } else {
                   resolve(results);
                }
            });
        });
    }
}

let transactionModelObj = new TransactionModel();

module.exports = transactionModelObj;