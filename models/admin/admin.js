'use strict';

const {ADMIN_TABLE} = require('../../helpers/constant');
const connection = require('../connection').connection;

/**
 * @class AdminModel
 */
class AdminModel {
    /**
     * 
     * @param {String} uid
     * @returns {Promise}
     */
    getAdminWithUid(uid) {
        return new Promise((resolve, reject) => {
            let query = `select * from ${ADMIN_TABLE} where uid = '${uid}'`;
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

let adminModelObj = new AdminModel();

module.exports = adminModelObj;