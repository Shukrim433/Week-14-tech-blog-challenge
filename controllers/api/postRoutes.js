const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// new post button (post route to create a new post)
// /api/post/
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body, //this would be the title and the body
            user_id: req.session.userId

        })
        res.status(200).json(postData)
    } catch(err) {
        res.status(400).json(err)
    }
})

// update post button (put route to update an existing post)
// /api/post/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData =  await Post.update(
            {title: req.body.title},
            {body: req.body.body}, 
            {where: {
                id: req.params.id,
                user_id: req.session.userId
                }
            })

        if(!postData[0]){ // checks if no rows were affected by the update operation because:   
            res.status(404).json({message: 'post with this id couldnt be found'})// In Sequelize, when you use the update method, it returns an array where the first element represents the number of rows affected by the update operation, and the second element contains the metadata associated with the operation.
            return
        }

        res.status(200).json(postData)
    } catch(err){
        res.status(500).json(err)
    }
})


// delete post button (delete route to delete an existing post)
// /api/post/:id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.userId 
            }
        })

        if (!postData){
            res.status(404).json({message: 'post with this id couldnt be found'})
            return
        }

        res.status(200).json(postData)
    } catch(err){
        res.status(500).json(err)
    }
})



module.exports = router;