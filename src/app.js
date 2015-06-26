import http from 'http';
import fs from 'fs';
import { Airline, route } from 'airline';

import responsetime from './middlewares/responsetime';
import logger from './middlewares/logger';
import contentlength from './middlewares/contentlength';

import homepage from './controllers/homepage';
import hello from './controllers/hello';
import streamcontroller from './controllers/stream';

import todoresource from './resources/todo';

export default function() {

    const easterEggMW = function*(next, { response }) {
        yield next;
        response.setHeader('X-Middlewared', 'yes');
    };

    const helloService = function(world, intonation, promise) {
        //console.log(promise);
        return function(name = world) {
            return intonation('Hello!, ' + name);
        }
    };

    const intonationService = function() {
        return function(sentence) {
            return sentence + ' ?!';
        }
    };

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

    return new Airline()
        .service('world', 'World !!!')
        .service('intonation', intonationService)
        .service('promise', function() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve("promised !");
                }, 10000);
            });
        })
        .service('hello', ['world', 'intonation', 'promise', helloService])
        //.use(responsetime())
        //.use(logger())
        //.use(contentlength())
        .routes(routes);
};

