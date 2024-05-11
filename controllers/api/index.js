const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes')
const commentRoutes = require('./commentRoutes')


router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);


module.exports = router;
