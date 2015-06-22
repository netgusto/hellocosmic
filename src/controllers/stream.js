'use strict';

import fs from 'fs'

export default function() {
    return function*(next, { response }) {
        response.body = fs.createReadStream(__dirname + '/stream.js');
    };
};

