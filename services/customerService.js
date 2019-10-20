'use strict';

const customerModel = require('../models/customer/customer');

/**
 * @class CustomerService
 */
class CustomerService {
    /**
     * 
     * @param {String} email 
     * @returns {Promise}
     */
    checkUserExists(email) {
        return new Promise((resolve, reject) => {
            customerModel.getCustomerWithEmail(email)
                .then((userData) => {
                    if(userData) {
                        let err = new Error('User already exists');
                        reject(err);
                    } else {
                        resolve();
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    /**
     * 
     * @param {Object} requestData 
     * @param {String} uid 
     * @returns {Promise}
     */
    signUp(requestData, uid) {
        return new Promise((resolve, reject) => {
            this.checkUserExists(requestData.email)
                .then(() => {
                    requestData.joined_date = new Date();
                    requestData.uid = uid;
                    return customerModel.createCustomer(requestData);
                })
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
        return new Promise((resolve, reject) => {
            customerModel.getCustomerWithUid(uid)
                .then((customerData) => {
                    if(customerData && customerData.email === email) {
                        // Customer exists
                        return customerData.customer_id;
                    } else {
                        // Customer does not exist, deny
                        let err = new Error('Customer login failed because customer does not exist');
                        reject(err);
                    }
                })
                .then((customerID) => {
                    resolve(customerID);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

const customerServiceObj = new CustomerService();

module.exports.customerServiceObj = customerServiceObj;
