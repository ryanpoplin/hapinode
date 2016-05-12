'use strict';

const Hapi = require('hapi'), // the web server framework
    Boom = require('boom'), // Enhanced error object
    Good = require('good'), // hapi logging
    Joi = require('joi'), // JS Object validation
    Inert = require('inert'), // access public resources, like .html files
    Vision = require('vision'), // plugin for template engine setup
    r = require('request'), // node.js http module wrapper
    server = new Hapi.Server();

server.connection({ port: 3000 });

// routes...

server.route({
    method: 'GET',
    path: '/healthcheck',
    handler: (request, reply) => {
      // r('', (error, response, body) => {
      //     reply(JSON.parse(body));
      // });
    },
    config: {
        'description': 'what the route does...',
        'notes': 'any type of notes on the route...',
        'tags': ['api']
    }
});

// valid articleId:
server.route({
    method: 'GET',
    path: '/api/v1/push-api/articles/{articleId}',
    handler: (request, reply) => {
        // r(`${encodeURIComponent(request.params.name)}`, (error, response, body) => {
        //     reply(JSON.parse(body));
        // });
    }
});

// valid channelId:
server.route({
    method: 'GET',
    path: '/api/v1/push-api/channels/{channelId}',
    handler: (request, reply) => {
        // r(`/${encodeURIComponent(request.params.name)}`, (error, response, body) => {
        //     reply(JSON.parse(body));
        // });
    }
});

// Joi & Boom testing...
server.route({
    method: 'GET',
    path: '/http/error',
    handler: (request, reply) => {
        r('http://someurl.doesnotexist.com', (error, response, body) => {
            if (!error && response.statusCode !== 404) {
                reply(body);
            }

            let err = new Error(error),
                // Boom usage...
                boomErr = Boom.wrap(err, 404);
            console.log(boomErr);

            let schema = {
                a: Joi.string(),
                b: Joi.number()
            };
            Joi.validate({a: 'a string', b: 25}, schema, (err, value) => {
                if (err) {
                    throw err;
                }
                console.log('Joi let me know my object has valid values within...');
            });

            reply('There was an error accessing content via this API route...');
        });
    }
});

// Inert & Vision testing...
server.route({
    method: 'GET',
    path: '/index',
    handler: function (request, reply) {
        reply.file('./public/index.html');
    }
});



// GET
// /api/v1/push-api/channels/{channelId}/sections
// /api/v1/push-api/search/channels
// /api/v1/push-api/sections/{sectionId}
// /api/v1/stats/article/{url}

// POST
// /api/v1/log/failure
// /api/v1/post/{type}/{url}
// /api/v1/stats/apple-push

// DELETE
// /api/v1/push-api/articles/{articleId}

server.register([
    Inert,
    Vision
], function error(err) {
    if (err) {
        throw err;
    }
});

// must figure this out =(
// server.register({
//     register: Good,
//     options: {
//         reporters: [{
//             reporter: require('good-console'),
//             events: {
//                 response: '*',
//                 log: '*'
//             }
//         }]
//     }
// }, (err) => {
//     if (err) {
//         throw err;
//     }
    server.start((err) => {
        if (err) {
           throw err;
        }
        console.log('Hapi.js server start listening on port 3000...');
        server.log('info', 'Server running at: ' + server.info.uri);
    });
// });
