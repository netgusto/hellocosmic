'use strict';

import { route } from 'airline';

const mwFetch = function*(next, { request, response }) {

    let todo = yield new Promise(resolve => setTimeout(function() {
        resolve({ id: request.params.id, title: 'Todo #' + request.params.id });
    }, 994));

    request.todo = todo;
    yield next;
};

export default function() {
    return route('/',
        route('/', function*(next, { response }) { response.body = 'TODO /'; }),
        route().post('/', function*(next, { response }) { response.body = 'TODO-POST /'; }),
        route('/:id', [mwFetch],
            route('/', function*(next, { request, response }) { response.body = 'GET! /' + request.todo.title; }),
            route().put('/', function*(next, { request, response }) { response.body = 'PUT! /' + request.todo.title; })
        )
    );
};
