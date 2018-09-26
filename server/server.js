//const mongoose= require('mongoose');
//
//mongoose.connect('mongodb://localhost:27017/TodoApp2');


const express= require('express');
const bodyParser= require('body-parser');

const {mongoose}= require('./db/mongoose');
const {Todo}= require('./models/todo');
const {User}= require('./models/user');


const app= express();

app.use(bodyParser.json());


app.post('/todos',(req,res)=> {
    
   const todo= new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc)=> {
        res.send(doc);
    },
    (e)=> {
        res.status(400).send(e);
    });
    
});


app.get('/todos',(req,res)=> {
    Todo.find().then((todos)=>{
        res.send(todos);
    },
      (e)=> {
        res.status(400).send(e);
    }               
    )
})

app.get('/todos/:id',(req,res)=> {
    const id= req.params.id;
    
    Todo.findById(id).then((todo)=> {
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    },(e)=> {
        res.status(400).send();
    })
})

app.delete('/todos/:id',(req,res)=> {
    const id= req.params.id;
    
    Todo.findByIdAndRemove(id).then((todo)=> {
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    },(e)=> {
        res.status(400).send();
    })
})


app.listen(8000,()=> {
    console.log('Started on port 8000');
})






//const Todo= mongoose.model('Todo',{
//    text:{
//        type:String,
//        required:true,
//        minlength:1,
//        trim:true
//    },
//    completed:{
//        type:Boolean,
//        default:false
//    },
//    completedAt:{
//        type:Number,
//        default:null
//    }
//});
//
//const Todo1= new Todo({
//    text:'cook lunch'
//})
//
//Todo1.save().then((result)=>{
//    console.log('todo1--\n'+ result);
//},(err)=>{
//    console.log(err);
//})
//
//
//const Todo2= new Todo({
//    text:'cook dinner',
//    completed:true,
//    completedAt:123
//})
//
//Todo2.save().then((result)=>{
//    console.log('todo2--\n'+ result);
//},(err)=>{
//    console.log(err);
//})








//const User= mongoose.model('Users',{
//    email:{
//        type:String,
//        required:true,
//        minlength:1,
//        trim:true
//    },
//})
//
//const user1= new User({
//    email:'  deepakkumrawat8@gmail.com   '
//})
//
//user1.save().then((result)=>{
//    console.log('user1--\n'+ result);
//},(err)=>{
//    console.log(err);
//})




