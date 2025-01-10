/*import React, { useState } from "react";
//import "./HomePage.css";

function HomePage() {
  const [posts, setPosts] = useState([
    { id: 1, content: "Hello World!", image: null, video: null },
  ]);

  return (
    <div>
      <h1>Home</h1>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Uploaded" />}
          {post.video && (
            <video controls>
              <source src={post.video} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
*/


import React, { useState, useEffect } from 'react';
//import './App.css';

function HomePage() {
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

export default HomePage;