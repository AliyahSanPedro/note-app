import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import NoteCard from '../components/NoteCard';


const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/note');
      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      alert(error.response?.data?.message || "Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

useEffect(() => {
  setFilteredNotes(
    notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
    )
  );
}, [query, notes]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const addNote = async (title, description) => {
    console.log('addNote called with:', title, description);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (response.data.success) {
        fetchNotes()
        closeModal()
      }

      console.log('Response:', response.data);

      if (response.data?.success) {
        closeModal();
      }
    } catch (error) {
      console.error('Note add error', error);
      alert(error.response?.data?.message);
    }
  };

const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/note/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (response.data.success) {
      fetchNotes();
    }
  } catch (error) {
    console.error('Note delete error', error);
    alert(error.response?.data?.message || 'An error occurred while deleting the note.');
  }
};

const eidNote = async (id, title, description) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/note/${id}`,
      { id, title, description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    if (response.data.success) {
      fetchNotes();
      closeModal();
    }

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Note edit error', error);
    alert(error.response?.data?.message);
  }
};


  return (
    <div className='bg-pink-100 min-h-screen'>
      <Navbar setQuery={setQuery} />
      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {filteredNotes.length > 0 ? filteredNotes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        )): <p> No notes </p>}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className='fixed right-4 bottom-4 text-3xl bg-pink-500 text-white font-bold p-4 rounded-full'
      >
        +
      </button>

      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          eidNote={eidNote}
        />
      )}
    </div>
  );
};

export default Home;
