exports.plugin = {
    name: "hapi-my-water-product",
    version: "1.0.0",
    register: async function (server, options) {

        server.method({
            name: "task.addTodo",
            method: addTodo
        });

        server.method({
            name: "task.editTodo",
            method: editTodo
        });
        server.method({
            name: "task.deleteTodo",
            method: deleteTodo
        });

        server.method({
            name: "task.listTodo",
            method: listTodo
        });

    }
};

const addTodo = (server, request) => {
    var body = {
        head: request.payload.head,
        description: request.payload.description,
        type: request.payload.type,
        time: request.payload.time,
        status_card: request.payload.status
    }

    return new Promise((resovle, reject) => {
        server.methods.datasource.task.add(request.mongo.db, body)
            .then((response) => {
                if (response.result.ok == 1) {
                    resovle({
                        status: 200,
                        message: "Add success"
                    });
                } else {
                    resovle({
                        status: 500,
                        message: "Add failed"
                    })
                }
            }).catch((err) => {
                reject(err);
            });
    });
}

const listTodo = (server, request) => {
    return new Promise((resovle, reject) => {
        server.methods.datasource.task.Query(request.mongo.db)
            .then((response) => {
                resovle(response);
            }).catch((err) => {
                reject({
                    status: 500,
                    message: "failed"
                });
            });
    });
}

const editTodo = (server, request) => {
    var body = {
        head: request.payload.head,
        description: request.payload.description,
        type: request.payload.type,
        time: request.payload.time,
        status_card: request.payload.status
    }
    return new Promise((resovle, reject) => {
        const ObjectID = request.mongo.ObjectID;
        server.methods.datasource.task.Update(request.mongo.db, new ObjectID(request.params.id), body)
            .then((response) => {
                if (response.result.ok == 1) {
                    resovle({
                        status: 200,
                        message: "Update success"
                    });
                } else {
                    resovle({
                        status: 500,
                        message: "Update failed"
                    })
                }
            }).catch((err) => {
                reject(err);
            });
    });

}

const deleteTodo = (server, request) => {
    return new Promise((resovle, reject) => {
        const ObjectID = request.mongo.ObjectID;
        server.methods.datasource.task.Delete(request.mongo.db, new ObjectID(request.params.id))
            .then((response) => {
                if (response.result.n == 1) {
                    resovle({
                        status: 200,
                        message: "Delete success"
                    }, response);
                } else {
                    resovle({
                        status: 500,
                        message: "Delete failed"
                    });
                }
            }).catch((err) => {
                reject(err);
            });
    });
}