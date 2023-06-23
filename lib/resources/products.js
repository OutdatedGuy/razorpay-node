'use strict';

const { normalizeBoolean } = require('../utils/razorpay-utils')

module.exports = function (api) {

    const BASE_URL = "/accounts";

    return {
        requestProductConfiguration(accountId, params, callback) {
             
            let { tnc_accepted, ...rest } = params
            let data = Object.assign({tnc_accepted: normalizeBoolean(tnc_accepted), ...rest})

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            return api.post({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/products`,
                data: data
            }, callback);
        },

        edit(accountId, productId, params, callback) {
            
            let { tnc_accepted, ...rest } = params
            let data = Object.assign({tnc_accepted: normalizeBoolean(tnc_accepted), ...rest})

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            if (!productId) {
                return Promise.reject("Product Id is mandatroy");
            }

            return api.patch({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/products/${productId}`,
                data: data
            }, callback);
        },

        fetch(accountId, productId, callback) {

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            if (!productId) {
                return Promise.reject("Product Id is mandatroy");
            }

            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/products/${productId}`
            }, callback);
        },
        
        fetchTnc(productName, callback) {
            return api.get({
                version: 'v2',
                url: `/products/${productName}/tnc`
            }, callback);
        }
    }
}