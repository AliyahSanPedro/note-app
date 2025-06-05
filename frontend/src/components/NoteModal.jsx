import React, { useState, useEffect} from 'react';
import axios from 'axios';

const NoteModal = ({ closeModal,addNote,currentNote, eidNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title)
      setDescription(currentNote.description)
    }
  }, [currentNote])

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Submit clicked');

  if (currentNote) {
    await eidNote(currentNote._id, title, description);
  } else {
    await addNote(title, description);
  }
};


  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
      <div className='bg-pink-300 p-8 rounded w-96'>
        <h2 className='text-xl font-bold mb-4'> {currentNote ? "Edit Note" : "Add New Note" }</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Note Title'
            className='border p-2 w-full mb-4 bg-pink-200 '
            required
          />
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Note Description'
            className='border p-2 w-full mb-4 bg-pink-200'
            required
          />
          <button
            type='submit'
            className='bg-pink-500 text-white px-4 py-2 rounded w-full'
          >
          {currentNote ? "Update Note" : "Add Note"}
          </button>
        </form>
        <button
          onClick={closeModal}
          className='mt-4 text-red-500 underline w-full'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
