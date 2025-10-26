import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddNotice({ fetchNotices }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  const handleAdd = async () => {
    if (!title || !description) {
      toast.error("Title and Description required!");
      return;
    }

    const loader = toast.loading("Adding notice...");

    try {
      await axios.post('http://localhost:5000/api/notices', { title, description }, {
        headers: { Authorization: token }
      });
      toast.dismiss(loader);
      toast.success("Notice added!");
      setTitle('');
      setDescription('');
      fetchNotices();
    } catch {
      toast.dismiss(loader);
      toast.error("Failed to add notice!");
    }
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <div className="add-notice">
      <h2>Add Notice Here</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="notice-btns">
        <button onClick={handleAdd}>Add Notice</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
