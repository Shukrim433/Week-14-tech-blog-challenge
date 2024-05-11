const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// submit comment button (post route to create a comment)
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            body: req.body.body,
            post_id: req.body.post_id //get it from the 'data-id' attribute in the front end javascript/handlebars
        })
        
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;