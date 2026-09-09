const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

//proto load
const packageDefinition = protoLoader.loadSync('user.proto');
const proto = grpc.loadPackageDefinition(packageDefinition).user;

//user data
const users = {
    1: { id: 1, name: 'Jagan Dev', email: 'jagandev@example.com' },
    2: { id: 2, name: 'Person 2', email: 'person2@example.com' },
    3: { id: 3, name: 'Person 3', email: 'person3@example.com' },
    4: { id: 4, name: 'Person 4', email: 'person4@example.com' },
    5: { id: 5, name: 'Person 5', email: 'person5@example.com' }
};

//implementation of getUser
function getUser(call, callback) {
   console.log('Received request for user with id:', call.request.id);
    const user = users[call.request.id];
    if (!user) {
        return callback({
            code: grpc.status.NOT_FOUND,
            message: 'user not found'
        });
    }
    callback(null, {
        id: call.request.id,
        name: user.name,
        email: user.email

    });
}

//create grpc server

function main() {
    const server = new grpc.Server();
    server.addService(proto.UserService.service, {
        GetUser: getUser
    });
    server.bindAsync(
        '192.168.9.114:50051',
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log('server running on port 50051');
            // server.start();
        }
    );

}


main();