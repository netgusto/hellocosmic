import http from 'http';
import fs from 'fs';
import { Cosmic, DefaultHttpHandler, route } from 'cosmic';

import responsetime from './middlewares/responsetime';
import logger from './middlewares/logger';
import contentlength from './middlewares/contentlength';

import homepage from './controllers/homepage';
import hello from './controllers/hello';
import streamcontroller from './controllers/stream';

import todoresource from './resources/todo';

export default function() {

    const easterEggMW = function*(next, { response }) { yield next; response.setHeader('X-Middlewared', 'yes'); };

    const helloService = function(world, intonation) { return function(name = world) { return intonation('Hello, ' + name); } };
    const worldService = function() { return 'World' };
    const intonationService = function() { return function(sentence) { return sentence + ' ?!'; } };

    const apiroutes =
        route('/',
            route('/todos', todoresource())
        );

    const routes =
        route('/',
            route('/', homepage()),
            route('/hello/:name', hello()),
            route('/stream', streamcontroller()),
            route('/api', [easterEggMW], apiroutes)
        );

    return new Cosmic()
        .service('hello', ['world', 'intonation', helloService])
        .service('world', worldService)
        .service('intonation', intonationService)
        .use(responsetime())
        .use(logger())
        .use(contentlength())
        .routes(routes);
};

