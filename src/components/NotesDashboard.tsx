import { useEffect, useState } from 'react';
import { getNotes, createNote, deleteNote } from '../services/api';
import '../styles/NotesDashboard.css';

type Props = { token: string };

const NotesDashboard = ({ token }: Props) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = async () => {
    const res = await getNotes(token);
    setNotes(res.data);
  };

  const handleCreate = async () => {
    if (!newNote.trim()) return;
    await createNote(token, newNote);
    setNewNote('');
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await deleteNote(token, id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-dashboard">
      <div className="create-note-container">
        <input
          type="text"
          id="new-note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note..."
          className="note-input"
        />
        <button onClick={handleCreate} className="create-button">Add Note</button>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note._id)} className="delete-button">🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesDashboard;
