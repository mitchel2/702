require('dotenv').config();

// IMPORTACIONES
const express = require('express');
const mongodb = require('mongodb');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require ('errorhandler');

//const url = 'mongodb://localhost:27017'
//const ur1 = 'mongodb+srv://mitchelle:12345@702.7p24f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = process.env.MONGODB_URL
let app  =  express();
// MIDDELWARES
app.use(bodyParser.json());
app.use(logger('dev'));

mongodb.MongoClient.connect(url, (error, database) => {
    //console.log(url);
    if(error)return process.exit(1);
    const db =database.db('702');
    //console.log("Coneection is ok");

    app.get('/alumnos', (req, res)=>{
        db.collection('alumnos').find().toArray((error, results)=>{
            if(error)return next(error);
            console.log(results);
            res.send(results);
        })
    })

    app.post('/alumnos',(req, res)=>{
        let newAccount =  req.body;
        db.collection('alumnos').insert(newAccount,(error,results)=>{
            if(error)  return next(error);
            res.send(results);
        });
    });

    app.put('/alumnos/:id',(req,res)=>{
        db.collection('ealumnos').update(
            {_id: mongodb.ObjectID(req.params.id)},
            {$set:req.body},
            (error,resutls)=>{
                if(error) console.log(error);
                res.send(resutls);
            });
    });

    app.delete('/alumnos/:id',(req,res)=>{
        db.collection('alumnos').remove({_id: mongodb.ObjectID(req.params.id)},(error,results)=>{
            if(error) console.log(error);
            res.send(results);
        });
    });

    app.delete('/alumnosid/:id', (req, res) => {
        db.getCollection('alumnos').remove({ '_id' : ñ});
           db.collection('alumnos').remove({_id: req.params.id},(error,results)=>{
               if(error) console.log(error);
               res.send(results);
           });
       });

         /* API Maestros */

    app.get('/maestros',(req,res)=>{
        db.collection('maestros').find().toArray((error,results)=>{
            if(error) return next(error);
            console.log(results);
            res.send(results);
        });
    });

    app.post('/maestros',(req, res)=>{
        let newAccount =  req.body;
        db.collection('maestros').insert(newAccount,(error,results)=>{
            if(error)  return next(error);
            res.send(results);
        });
    });

    app.listen(3000, ()=>{
        console.log('Express server corriendo en el puesto 3000: \x1b[32m','online');
    })

});