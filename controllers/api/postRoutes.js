const router = require('express').Router();
const { post } = require('../../models');

router.get("/",async (req,res)=>{
  try {
    const posts = await post.findAll();
    res.json(posts)
  }catch (err) {
    res.status(400).json(err);
  }
})

router.get("/:id",async (req,res)=>{
  try {
    const singleposts = await post.findByPk();
    res.json(singleposts)
  }catch (err) {
    res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"login first!"})
  }
  try {
    const newpost = await post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"login first!"})
  }
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;