const express = require('express');
const app = express();
const session = require('express-session');
const port = 3052;

const taches = [
    {
        title: 'Apprendre à programmer',
        done: false,
    },
    {
        title: 'Faire les courses',
        done: false
    },
    {
        title: 'Faire à',
        done: true
    }
]


//explique à express qu'on veut utiliser le moteur de template ejs
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.get('/',(req,res)=>{
    if(!req.session.taches){
        req.session.taches=[]
    }
    res.render('todolist',{lesTaches: req.session.taches})
})

app.post('/task', (req,res) => {
    // if(req.body.tache){
        req.session.taches.push({
            title: req.body.tache,
            done: false
        })  
    // }
    res.redirect('/')

})

app.get('/taches/:index/terminee',(req,res)=>{
    if(req.session.taches[req.params.index]){
        req.session.taches[req.params.index].done=true;
    }
    res.redirect('/')
})

app.get('/taches/:index/supprimer',(req,res)=>{
    if(req.session.taches[req.params.index]){
        req.session.taches.splice(req.params.index,1)
    }
    res.redirect('/')
})


app.listen(port,()=>{
    console.log(`Le serveur écoute sur le port ${port}`)
})