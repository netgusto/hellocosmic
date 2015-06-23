import http from 'http';
import fs from 'fs';
import { Cosmic, DefaultHttpHandler, route } from 'cosmic';

import responsetime from './src/middlewares/responsetime';
import logger from './src/middlewares/logger';
import contentlength from './src/middlewares/contentlength';

import homepage from './src/controllers/homepage';
import hello from './src/controllers/hello';
import streamcontroller from './src/controllers/stream';

import todoresource from './src/resources/todo';

export default function() {

    const apiroutes =
        route('/',
            route('/todos', todoresource())
        );

    const routes =
        route('/',
            route('/', homepage()),
            route('/hello/:name', hello()),
            route('/stream', streamcontroller()),
            route('/api', [function*(next, { response }) { yield next; response.setHeader('X-Middlewared', 'yes'); }], apiroutes)
        );

    return new Cosmic()
        .service('hello', ['world', 'intonation', function(world, intonation) { return function(name = world) { return intonation('Hello, ' + name); } }])
        .service('world', function() { return 'World' })
        .service('intonation', function() { return function(sentence) { return sentence + ' ?!'; } })
        .use(responsetime())
        .use(logger())
        .use(contentlength())
        .routes(routes);
};

