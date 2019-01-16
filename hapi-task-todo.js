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
            method: () => { }
        });
        server.method({
            name: "task.deleteTodo",
            method: () => { }
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
        time: request.payload.time
    }

    return new Promise((resovle, reject) => {
        server.methods.datasource.task.add(request.mongo.db, body)
            .then((response) => {
                console.log(response);
                resovle(response);
            });
    });
}

const listTodo = (server, request) => {
    return new Promise((resovle, reject) => {
        console.log('เข้ามาทำมั้ย')
        server.methods.datasource.task.Query(request.mongo.db)
            .then((response) => {
                console.log(response);
                resovle(response);
            });
    });

}