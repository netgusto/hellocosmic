import http from 'http';
import App from './src/app';

App().compile().then(app => {
    http.createServer(app.httpHandler()).listen(3000);
    console.log('Magic happens on http://127.0.0.1:3000');
});

