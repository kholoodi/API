//link conroller with it's model
const Post = require("../models/post")

module.exports = {
    // index function return all posts info 
    index:(req,res)=> {
        Post.find({}) //if true do then else do catch
        .then(posts => {
            res.json(posts)
        })
        .catch(error=> {
            res.json({error: error})
        })
    },
    //Show info  spsific user
    show:(req,res)=> {
        let postId = req.params.pid
        Post.findById (postId) //if true do then else do catch
        .then(post => {
            res.json({post})
        })
        .catch(error=> {
            res.json({error: error})
        })
    },
    //update 
    update:(req,res)=> {
        let postId = req.params.pid
        let postInfo = {
            title: req.body.title,
            text: req.body.text,
            userId: req.body.userId
        }
        Post.findByIdAndUpdate (postId, {$set: postInfo}) //if true do then else do catch
        .then(user => {
            res.json({message: "Post information has been updated"})
        })
        .catch(error=> {
            res.json({error: error})
        })
    },
    delete:(req,res)=> {
        let postId = req.params.pid
        Post.findByIdAndRemove (postId) //if true do then else do catch
        .then(() => {
            res.json({message: "Post is deleted "})
        })
        .catch(error=> {
            res.json({error: error})
        })
    },
    //create a new post 
    create: (req,res)=>{
        let post = new Post ({
            title: req.body.title,
            text: req.body.text,
            userId: req.body.userId
        })
        post.save((error) => {
            if(error)
                res.json({error: error})
            else
                res.json({message: "Post inserted "})
        })

    }
}
