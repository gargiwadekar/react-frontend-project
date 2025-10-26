import axios from 'axios';
import toast from 'react-hot-toast';

export default function NoticeList({ notices, fetchNotices }) {
  const token = localStorage.getItem('token');

  const handleDelete = async (id) => {
    const loader = toast.loading("Deleting notice...");
    try {
      await axios.delete(`http://localhost:5000/api/notices/${id}`, {
        headers: { Authorization: token }
      });
      toast.dismiss(loader);
      toast.success("Notice deleted!");
      fetchNotices();
    } catch {
      toast.dismiss(loader);
      toast.error("Failed to delete notice!");
    }
  };

  const handleRepost = async (notice) => {
    const loader = toast.loading("Reposting notice...");
    try {
      await axios.post('http://localhost:5000/api/notices', {
        title: notice.title,
        description: notice.description
      }, { headers: { Authorization: token }});
      toast.dismiss(loader);
      toast.success("Notice reposted!");
      fetchNotices();
    } catch {
      toast.dismiss(loader);
      toast.error("Failed to repost!");
    }
  };

  return (
    <div className="notice-list">
      {notices.map(n => (
        <div key={n._id} className="notice-card">
          <h3>{n.title}</h3>
          <p>{n.description}</p>
          <p>{new Date(n.createdAt).toLocaleString()}</p>
          <div className="notice-card-btns">
            <button onClick={() => handleRepost(n)}>Repost</button>
            <button onClick={() => handleDelete(n._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
