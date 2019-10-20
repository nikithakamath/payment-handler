'use strict';

const {CUSTOMER_TABLE} = require('../../helpers/constant');
const connection = require('../connection').connection;

/**
 * @class CustomerModel
 */
class CustomerModel {
    /**
     * 
     * @param {String} email 
     * @returns {Promise}
     */
    getCustomerWithEmail(email) {
        return new Promise((resolve, reject) => {
            let query = `select * from ${CUSTOMER_TABLE} where email = '${email}'`;
            connection.query(query, function (error, results) {
                if(error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
    /**
     * 
     * @param {Object} customerDetails 
     * @returns {Promise}
     */
    createCustomer(customerDetails) {
        return new Promise((resolve, reject) => {
            let query = `insert into ${CUSTOMER_TABLE} set ?`;
            connection.query(query, customerDetails, function (error, results) {
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
     * @param {String} uid
     * @returns {Promise}
     */
    getCustomerWithUid(uid) {
        return new Promise((resolve, reject) => {
            let query = `select * from ${CUSTOMER_TABLE} where uid = '${uid}'`;
            connection.query(query, function (error, results) {
                if(error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
}

let customerModelObj = new CustomerModel();

module.exports = customerModelObj;