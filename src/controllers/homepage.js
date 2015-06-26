'use strict';

export default function() {
    return function*(next, { response, app}) {
        response.body = "This is the HP !!!" + app.service('hello')();
    };
};
