const router = require('express').Router();
const { User } = require('../../models');


//sign up button - post route to take user input (req.body) and create a user (sign up)
// /api/user/signup
router.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        // create the new user
        const userData = await User.create(req.body)

        //create the new session object (for this session)
        req.session.save(() => {
            req.session.userId = userData.id,
            req.session.logged_in = true 

            res.status(200).json(userData)
        })

        
    } catch(err){
        res.status(400).json(err) // 400 = bad request from the user, ie if theyre signing up and they enter a password < 8 characters
    }
})

//log in button - post route to take user input (req.body) and verify password (use instance method) and login (log in)
// /api/user/login
router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const userData = await User.findOne({
            where: {userName: req.body.userName}
        })

        if(!userData) {
            res.status(400).json({message: 'incorrect username or passowrd'})
            return
        }

        // uses the instance method in the User model to check if the user entered the correct password
        const validPassword = await userData.checkPassword(req.body.password)
        if(!validPassword) {
            res.status(400).json({message: 'incorrect username or passowrd'})
            return
        }

        req.session.save(()=> {
            req.session.userId = userData.id,
            req.session.logged_in = true

            res.json({user: userData, message: 'you are now logged in!'})
        })

    } catch(err){
        res.status(400).json(err)
    }
})

//log out button - post route to take the session obj created for the user when they logged in (req.session) and destroy it (log out)
// /api/user/logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end()          // 204 = "No Content." It means that the server has successfully processed the request and is not returning any content in the response body. 
      })
    } else {
      res.status(404).end()           // 404 = "Not Found." If the user is not logged in, the server responds with 404 meaning the requested resource (the session) could not be found 
    }
  })

  
module.exports = router;