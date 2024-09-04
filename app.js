const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 8000;

mongoose
.connect('mongodb://127.0.0.1:27017/learning')
.then(res=>{
    console.log('connected...')
})
.catch(err=>{console.log('error',err)});



const dbSchema = new mongoose.Schema({
    category:{
        type:String,
        
    },
    division:{
        type:String
    },
    number:{
        type:Number
    }
});

const Collection = mongoose.model('Collection',dbSchema)


app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.post('/user', async(req,res,next)=>{

//     const result =  await Collect.insertMany(req.body);
//     console.log(result)
//     return res.status(201).json({
//         success:true,
//         data:result
//     })
    
// });

// app.put('/user/:id',async (req,res)=>{
//     const {id} = req.params;
//     const data =  await Collect.findOneAndUpdate({_id:id},req.body);
//     return res.status(201).json({
//         status:success,
//        data:data
//     })
// })
app.post('/user',async(req,res)=>{
    const data = new Collection(req.body);
    await data.save()
    console.log(data);
    res.status(201).json({
        success:true,
        data:data
    })
})

app.listen(port,()=>{
    console.log(`Server runs on port ${port}`);
})
app.get('/user', async(req,res)=>{
    const data = await Collection.find({}).select({division:1, _id:0});
    console.log(data)
    res.status(200).json({
        success:true,
        data:data
    })
})
app.get('/user/:id',async (req,res)=>{
   
    const data = await Collection.findById( req.params.id);
    console.log(data);
    res.status(200).json({
        success:true,
        data:data
    })
})
app.patch('/user/:id', async (req,res)=>{
   // const updatedId = req.body;
    const data = await Collection.findByIdAndUpdate(req.params.id , req.body);
    console.log(data);
    res.status(201).json({
        update:true,
        data:data
    })
})
app.delete('/user/:id', async(req,res)=>{
    const data = await Collection.findByIdAndDelete(req.params.id);
    console.log(data);
    res.status(201).json({
        deleted:true,
        data:data
    })
})
