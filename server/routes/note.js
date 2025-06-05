import express from 'express';
import Note from '../models/Note.js';
import middleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/add', middleware, async (req, res) => {
  try {
    console.log('BODY:', req.body); // check title/description
    console.log('USER:', req.user); // check user injected by middleware

    const { title, description } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'User not attached' });
    }

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Missing title or description' });
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id
    });

    await newNote.save();
    return res.status(200).json({ success: true, message: 'Note added successfully' });
  } catch (error) {
    console.error('Add Note Error:', error.message); // show error
    return res.status(500).json({ success: false, message: 'Error in Adding Note' });
  }
});


router.get('/', async (req,res) => {
   try {
       const notes = await Note.find()
       return res.status (200).json({success: true, notes})
   }catch(error) {
    return res.status(500).json({success: false, message: "cant retrive notes"})
   }    
  })

  router.put ("/:id", async (req,res) => {
    try {
      const{id} = req.params;
      const updateNote = await Note.findByIdAndUpdate(id, req.body)
      return res.status (200).json({success: true, updateNote})
   }catch(error) {
    return res.status(500).json({success: false, message: "cant update notes"})
    }
  })

    router.delete ("/:id", async (req,res) => {
    try {
      const{id} = req.params;
      const updateNote = await Note.findByIdAndDelete(id)
      return res.status (200).json({success: true, updateNote})
   }catch(error) {
    return res.status(500).json({success: false, message: "cant delete notes"})
    }
  })

export default router;
