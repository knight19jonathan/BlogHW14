const router = require('express').Router();
const { comment } = require('../../models');

router.get("/",async (req,res)=>{
  try {
    const comments = await comment.findAll();
    res.json(comments)
  }catch (err) {
    res.status(400).json(err);
  }
})

router.get("/:id",async (req,res)=>{
  try {
    const singlecomments = await comment.findByPk();
    res.json(singlecomments)
  }catch (err) {
    res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"login first!"})
  }
  try {
    const newcomment = await comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newcomment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"login first!"})
  }
  try {
    const commentData = await comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;