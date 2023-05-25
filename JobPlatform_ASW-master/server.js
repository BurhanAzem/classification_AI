const http = require("http");
const app = require("./app");
const port = 3003;
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const server = http.createServer(app);
server.listen(port, '127.0.0.1',(req,res)=>{
    console.log("server on 127.0.0.1 port 3003")
});
