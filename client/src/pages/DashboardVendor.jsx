import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles.css';

const DashboardVendor = () => {
    const token = localStorage.getItem('token');
    const [tasks, setTasks] = useState([]);
    const [fileUpload, setFileUpload] = useState({}); // {taskId: file}

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tasks/vendor', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch(err){ console.log(err); }
    }

    const handleFileChange = (taskId, e) => {
        setFileUpload({ ...fileUpload, [taskId]: e.target.files[0] });
    }

    const handleUpload = async (taskId) => {
        if (!fileUpload[taskId]) return alert('Select a file first!');
        const formData = new FormData();
        formData.append('file', fileUpload[taskId]);

        try {
            await axios.post(`http://localhost:5000/api/tasks/${taskId}/upload`, formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            });
            alert('File uploaded!');
            fetchTasks();
        } catch(err){ console.log(err); alert('Upload failed'); }
    }

    useEffect(()=>{ fetchTasks(); }, []);

    return (
        <div>
            <Navbar/>
            <h1>Welcome, {localStorage.getItem('name')} (Vendor)</h1>
            <h2>Your Tasks</h2>
            <ul>
  {tasks.length > 0 ? (
    tasks.map(task => (
      <li key={task._id} className="list-item">
        <strong>{task.title}</strong> ({task.status})
        <p><b>Event:</b> {task.eventId?.title}</p>
        <p><b>Venue:</b> {task.eventId?.venue}</p>
        <p><b>Date:</b> {new Date(task.eventId?.date).toLocaleDateString()}</p>

        <div style={{ marginTop: '10px' }}>
          <input type="file" onChange={(e)=>handleFileChange(task._id, e)} />
          <button onClick={()=>handleUpload(task._id)}>Upload Document</button>
        </div>
      </li>
    ))
  ) : (
    <p>No tasks assigned yet.</p>
  )}
</ul>

        </div>
    )
}

export default DashboardVendor;
