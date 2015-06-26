'use strict';

export default function() {
    return function*(next, { response, request, app }) {
        response.body = app.service('hello')(request.params.name);
    };
};

