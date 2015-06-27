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
        return function(name = world) {
            return intonation('Hello!, ' + name + '; Promise says : ' + promise);
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
        .service('world', ['promise'], function(promise) { return 'World !!!' + promise; })
        .service('intonation', intonationService)
        .service('promise', ['otherpromise'], function(otherpromise) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve(new Promise(function(resolve2) {
                        resolve2("I promise nested, me and " + otherpromise + " !!!!");
                    }));
                }, 3000);
            });
        })
        .service('otherpromise', function() {
            return Promise.resolve('yeah yeah');
        })
        .service('hello', ['world', 'intonation', 'promise'], helloService)
        .use(responsetime())
        .use(logger())
        .use(contentlength())
        .routes(routes);
};

