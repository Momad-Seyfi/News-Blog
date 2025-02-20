import React, { useEffect, useState } from 'react';
import Post from '../Post';
import AuthorsList from './AuthorsList'; // ایمپورت کردن لیست نویسندگان

function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // مدیریت وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطا

  useEffect(() => {
    fetch('/api/post')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then(posts => {
        setPosts(posts);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Welcome to Our Blog</h1>
      <AuthorsList /> {/* نمایش لیست نویسندگان */}
      {posts.length > 0 ? (
        posts.map(post => <Post key={post.id || post._id} {...post} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default IndexPage;
