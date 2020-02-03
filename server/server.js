const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const serve = require("koa-static");
const mount = require("koa-mount");
const HttpStatus = require("http-status");
const axios = require("axios");
const mongoose = require('mongoose');
const app = new Koa();
const TodoModel = require('./models/todosModel');

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://127.0.0.1:27017/mydbs',{
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("kkkk")
    // we're connected!
});


app.use(BodyParser());
app.use(Logger());
app.use(cors());

const router = new Router();


router.get("/saveTodos",async (ctx,next)=>{
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const savedTodos = data.map((item,i)=>{
        const{userId,id,title,completed}=item;
        new TodoModel({userId,id,title,completed})
            .save()
            .then((data)=>console.log(`Object ${data.title} saved!`))
            .catch((err)=>console.log(err));
    });
    ctx.status = HttpStatus.OK;
    ctx.body = `${savedTodos.length} todos saved!`;
    await next();
});
router.get("/remainingTodos",async (ctx,next)=>{
    try{
        const remaining = await TodoModel.find({});
        ctx.status = HttpStatus.OK;
        ctx.body = remaining;
        await next();
    }catch (e) {
        console.log(e);
    }
});

router.del("/:id",async (ctx,next)=>{
    try{
        const deletedTodo = await TodoModel.findOneAndRemove({id:Number(ctx.params.id)});
        ctx.status = HttpStatus.OK;
        ctx.body = deletedTodo;
        await next();
    }catch (e) {
        console.log(e)
    }
});

app.use(router.routes()).use(router.allowedMethods());


app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
