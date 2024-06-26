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
        //res.status(200).json(posts)
    } catch(err) {
        res.status(500).json(err)
    }
})

// individual post page (get route to display the role thats clicked on + associated users + associated comments)
router.get('/post/:id', async (req, res) => {
    console.log(req.params)
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
        //res.status(200).json(post)
    } catch(err) {
        console.log(err)
        res.status(500).json
    }
})

// profile page update form (get route to populate the update form with the selected roles information)
router.get('/update-post-form/:id', async (req, res) => {
    console.log(req.params)
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {model: User},
                {model: Comment}
            ]
        })
        const post = postData.get({ plain: true });
        
        res.status(200).json(post)
    } catch(err) {
        console.log(err)
        res.status(500).json
    }
})

// profile page (get route to display all of the posts of the logged in user on their profile page)
router.get('/profile', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: {model: Post}
        })
        const user = userData.get({ plain: true });

        res.render('profile', {
            user,  // single object
            logged_in: true
        })
        //res.status(200).json(user)
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