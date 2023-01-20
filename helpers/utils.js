'use strict';

// public interface
module.exports.formatResponse = formatResponse;

/**
 * @description formats response
 * adds status code - 1 denoting success and 0 error
 * @param {*} status
 * @param {*} content
 * @returns
 */
function formatResponse(status, content) {
    if (!status && !content) {
        status = 0;
    } else if (
        ('number' !== typeof status && 'undefined' === typeof content) ||
        typeof status === 'object'
    ) {
        content = status;
        status = 1;
    }

    return {
        status: status,
        data: content,
    };
}
