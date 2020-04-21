const app = require(`../index`);
const server = require(`http`).createServer(app);
const port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log(`Running on port ${port}`)
})