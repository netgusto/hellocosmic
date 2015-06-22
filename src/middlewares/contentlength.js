'use strict';

export default function() {
    return function*(next, { response }) {
        yield next;
        if(response.body !== null) { response.setHeader('X-ContentLength', response.body.length);}
    };
};
