#!/usr/bin/env babel-node --harmony
'use strict';

import Chalk from 'chalk';
import App from './src/app';

const app = new App();
//console.log(app);

//console.log(app.serviceDefinitions.map(def => def.));

const reflection = app.reflection;

console.log('');

console.log(Chalk.blue('# Services :'));
console.log(reflection.services.map(service => Chalk.green(service.name) + ' <- ' + (service.dependencies.length ? service.dependencies.map(d => Chalk.yellow(d)) : [Chalk.red('∅')]).join(', ')).join('\n'));

console.log('');

console.log(Chalk.blue('# Routes :'));
console.log(reflection.routes.map(route => {

    const buff = [];
    buff.push(Chalk.green(route.path) + Chalk.yellow(' (' + route.method + ')'));

    if(route.mw.length) {
        buff.push(' ' + Chalk.cyan(route.mw.length + ' mw'));
    }

    return buff.join('');
}).join('\n'));

console.log('');