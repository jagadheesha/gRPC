const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

//proto load
const packageDefinition = protoLoader.loadSync('user.proto');
const proto = grpc.loadPackageDefinition(packageDefinition).user;

//client
const client = new proto.UserService(
    '192.168.9.114:50051',
    grpc.credentials.createInsecure()
);

//call API
client.GetUser({ id: 3}, (error, response) => {
    if(error){
        console.error('Error:', error);
        return;
    }
    console.log('user recieved:', response);
});