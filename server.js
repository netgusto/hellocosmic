import http from 'http';
import { DefaultHttpHandler } from 'cosmic';
import App from './app';

const app = App();
http.createServer(DefaultHttpHandler(app)).listen(3000);

console.log('Magic happens on http://127.0.0.1:3000');

