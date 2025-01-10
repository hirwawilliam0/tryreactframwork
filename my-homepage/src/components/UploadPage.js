

import React, { useState, useEffect } from 'react';
import './Uploadpage.css';

function UploadPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  useEffect(() => {
    fetch('http://localhost:500/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (media) {
      formData.append('media', media);
    }

    fetch('http://localhost:500/api/posts', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((newPost) => {
        setPosts([...posts, newPost]);
        setTitle('');
        setContent('');
        setMedia(null);
      });
  };

  return (
    <div className="App">
      <h1>Dynamic Website</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
        />
        <button type="submit">Add Post</button>
      </form>

      <h2>Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.media && <img src={`http://localhost:5
            00${post.media}`} alt="Media" style={{ maxWidth: '100%' }} />||
            <video src={`http://localhost:500${post.media}`} alt="Media" style={{ maxWidth: '100%' }}></video>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadPage;

