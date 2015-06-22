'use strict';

import { route } from 'cosmic';

const mwFetch = function*(next, { request, response }) {
    request.todo = { id: request.params.id, title: 'Todo #' + request.params.id };
    yield next;
};

export default function() {


    return route('/',
        route('/', function*(next, { response }) { response.body = 'TODO /'; }),
        route('/', 'POST', function*(next, { response }) { response.body = 'TODO-POST /'; }),
        route('/:id', [mwFetch],
            route('/', function*(next, { request, response }) { response.body = 'GET! /' + request.todo.title; }),
            route('/', 'PUT', function*(next, { request, response }) { response.body = 'POST! /' + request.todo.title; })
        )
    );
};
