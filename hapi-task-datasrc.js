exports.plugin = {
    name: "hapi-task-datasrc",
    version: "1.0.0",
    register: async function (server, options) {
        server.method({
            name: "datasource.task.add",
            method: InsertTodo,
        });

        server.method({
            name: "datasource.product.Update",
            method: () => { },
        });

        server.method({
            name: "datasource.product.Remove",
            method: () => { },
        });

        server.method({
            name: "datasource.task.Query",
            method: QueryTodo
        });
    }
};
const InsertTodo = (db, body) => {
    return db.collection('woiacth').insert(body);
}

const QueryTodo = (db) => {
    console.log('เข้ามาทำใน mongo')
    return new Promise((resolve, reject) => {
        db.collection('woiacth').find({})
        .toArray((err, result) => {
            resolve(result);
        });
    });
    
    
}