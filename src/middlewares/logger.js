'use strict';

export default function() {
    return function*(next, { request }) {
        console.log(request.method + ' ' + request.url + ' - ' + JSON.stringify(request.params));
        yield next;
    };
};
