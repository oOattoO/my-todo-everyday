const Hapi = require('hapi');

const dbOpts = {
    url:
        "mongodb://admin:admin@cluster0-shard-00-00-sdzlc.gcp.mongodb.net:27017,cluster0-shard-00-01-sdzlc.gcp.mongodb.net:27017,cluster0-shard-00-02-sdzlc.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    settings: {
        poolSize: 10
    },
    decorate: true
};

// Create a server with a host and port
const server = Hapi.server({
    host: '0.0.0.0',
    port: process.env.PORT || 8000
});

// add task route
server.route({
    method: 'POST',
    path: '/task/add',
    handler: function (request, reply) {
        return server.methods.task
            .addTodo(server, request)
            .then(reply);
    }
});

server.route({
    method: 'GET',
    path: '/task/list',
    handler: (request, reply) => {
        return server.methods.task
            .listTodo(server, request)
            .then(reply);
    }
});

// update task route
server.route({
    method: 'PUT',
    path: '/task/{id}',
    handler: function (request, reply) {
        return server.methods.task
            .editTodo(server, request)
            .then(reply);
    }
});

// delete task route
server.route({
    method: 'DELETE',
    path: '/task/delete/{id}',
    handler: function (request, reply) {
        return server.methods.task
            .deleteTodo(server, request)
            .then(reply);
    }
});

// Start the server
const start = async function () {

    try {
        await server.register([
            {
                plugin: require("hapi-mongodb"),
                options: dbOpts
            },
            require("./hapi-task-todo"),
            require("./hapi-task-datasrc")
        ]);
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();