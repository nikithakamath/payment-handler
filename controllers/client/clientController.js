'use strict';

const clientService = require('../../services/clientService').clientServiceObj;

/**
 * @class ClientController
 */
class ClientController {
    /**
     * @returns {Promise}
     */
    getClients() {
        return new Promise((resolve, reject) => {
            clientService.getClients()
                .then((clientList) => {
                    resolve(clientList);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

const clientObj = new ClientController();

module.exports.clientObj = clientObj;