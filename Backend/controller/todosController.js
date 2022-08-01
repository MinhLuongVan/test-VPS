const ListTD = require('../model/listModel')
const User = require('../model/userModel');
  const ListTDController = {
    //get all todos
    getAllList : async(req,res) =>{
        try {
            const isAdmin = req.user.isAdmin;
            if(isAdmin == true)
            {
                const todo = await ListTD.find();
                res.status(200).json(todo);
            }
            
        } catch (error) {
           return res.status(500).json(error);
        }
    },

    //get list todo by id
    getAllListOwner : async(req,res) =>{
        try {
            const isAdmin = req.user.isAdmin;
            if(isAdmin == false){
            const todo = await ListTD.find({ owner: req.user.id });
            res.status(200).json(todo);
            }
            
        } catch (error) {
           return res.status(500).json(error);
        }
    },
    

    // create todo

    createList : async(req,res)=>{
       try {
        const newToDo = await new ListTD({
           
            title: req.body.title,
            owner: req.user.id
            
        });
        const todolist = await newToDo.save();
        res.status(200).json(todolist);
       } catch (error) {
        res.status(500).json("Create thất bại")
       }

    },

    //delete todo

    deleteList : async(req,res)=>{
          
        try {
            //const isAdmin = req.user.id;
            const postDeleteCondition = { _id: req.params.id } //owner: req.user.id
            // if(isAdmin == true || postDeleteCondition){
                const todo = await ListTD.findOneAndDelete(postDeleteCondition);
                if(!todo) {
                    res.json({
                        success: false,
                        message: 'Delete that bai'
                    })
                }
              res.status(200).json('delete thành công');
                
            
        } catch (error) {
           console.log(error)
        }
        
    },

    // findone update
    findOneTodo : async(req,res) => {
        try {
            const todo = await ListTD.findById(req.params.id)
            res.status(200).json({
                data:todo,
                message :"Thành công"
            })
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // update todo

    updateList : async(req,res) => {
        
        try {
            const {title} = req.body;
            const updatedPost = {title}
            const postUpdateCondition = { _id: req.params.id } //owner: req.user.id
            const updateTodo = await ListTD.findOneAndUpdate(postUpdateCondition,updatedPost,
                {new:true}
            );
            if(!updateTodo) {
                res.json({
                    success: false,
                    message: 'Update that bai'
                })
            }
            res.status(200).json('Update thành công');
    
        } catch (error) {
             res.status(500);
            console.log(error);
            
        }
    },
    
  }
  module.exports = ListTDController;