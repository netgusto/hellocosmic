'use strict';

export default function() {
    return function*(next, { response, request }) {
        response.body = 'Hello, ' + request.params.name + ' !!!!';
    };
};

