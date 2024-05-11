const router = require('express').Router();
const { User, Comment, Post} = require('../models');
const withAuth = require('../utils/auth');

// home page (get route to display all the posts from any/all users on the homepage + associated users)
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include : {model: User}
        })
        const posts = postData.map((post) => post.get({plain:true}))

        res.render('homepage', {
            posts,  //array of objects
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// individual post page (get route to display the role thats clicked on + associated users + associated comments)
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {model: User},
                {model: Comment}
            ]
        })
        const post = postData.get({ plain: true });
        
        res.render('post', {
            post,  //single object
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json
    }
})

// profile page (get route to display all of the posts of the logged in user on their profile page)
router.get('/profile', withAuth, async (req, res) => {
    try{
        const postData = await User.findByPk(req.session.userId, {
            include: {model: Post}
        })
        const posts = postData.map((post) => post.get({plain:true}))

        res.render('profile', {
            posts,  //array of objects
            logged_in: true
        })

    } catch(err){
        res.status(500).json(err)
    }
})

// login page (get route that redirects you to the profile page once logged in)
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/profile')
        return
    }
    res.render('login')  // else you see the login page
})

// signup page (get route that redirects you to the profile page once logged in)
router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/profile')
        return
    }
    res.render('signup')  // else you see the signup page
})

module.exports = router;