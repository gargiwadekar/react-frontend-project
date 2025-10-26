import { useState, useEffect } from 'react';
import axios from 'axios';
import AddNotice from './AddNotice.jsx';
import NoticeList from './NoticeList.jsx';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState('add'); // add or show
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) navigate('/');

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notices');
      setNotices(res.data);
    } catch {
      toast.error("Failed to fetch notices!");
    }
  };

  useEffect(() => {
    if (activeTab === 'show') fetchNotices();
  }, [activeTab]);

  return (
    <div className="dashboard">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dashboard-left">
        <button onClick={() => setActiveTab('add')}>Add Notice</button>
        <button onClick={() => setActiveTab('show')}>Show Notices</button>
      </div>
      <div className="dashboard-right">
        {activeTab === 'add' ? (
          <AddNotice fetchNotices={fetchNotices} />
        ) : (
          <NoticeList notices={notices} fetchNotices={fetchNotices} />
        )}
      </div>
    </div>
  );
}
