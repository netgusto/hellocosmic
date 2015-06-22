'use strict';

export default function() {
    return function*(next, { response }) {
        var start = new Date();
        yield next;
        response.setHeader('X-ResponseTime', (new Date()) - start + 'ms');
    };
};
