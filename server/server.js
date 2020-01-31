const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const serve = require("koa-static");
const mount = require("koa-mount");
const HttpStatus = require("http-status");
const axios = require("axios");

const app = new Koa();

const PORT = process.env.PORT || 3001;

app.use(BodyParser());
app.use(Logger());
app.use(cors());


const router = new Router();

router.get("/",async (ctx,next)=>{
    const data = await axios.get('https://jsonplaceholder.typicode.com/todos');
    // if (ctx.request.query) {
    //     const cloneJsonData=JSON.stringify({...data});
    //     console.log(cloneJsonData)
    //     ctx.body = cloneJsonData;
    //
    // }
    console.log("KOKO");

    console.log(ctx.query);
    const dataJson = await JSON.stringify(data.data);
    ctx.status = HttpStatus.OK;
    ctx.body = dataJson;
    await next();
});
// router.del("/",async (ctx,next)=>{
//     const data = await axios.get('https://jsonplaceholder.typicode.com/todos');
//     const dataJson = await JSON.stringify(data.data);
//     ctx.status = HttpStatus.OK;
//     ctx.body = dataJson;
//     await next();
// });

app.use(router.routes()).use(router.allowedMethods());


app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
