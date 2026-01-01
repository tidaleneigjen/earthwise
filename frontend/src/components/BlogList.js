import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listBlogPosts } from "../api";

const BlogList = () => {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const data = await listBlogPosts();
        if (!mounted) return;
        setState({ loading: false, error: "", data });
      } catch (e) {
        if (!mounted) return;
        setState({
          loading: false,
          error: e?.message || "Failed to load blog posts",
          data: null,
        });
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  if (state.loading) {
    return (
      <>
        <h2>Blog</h2>
        <p>Loading…</p>
      </>
    );
  }

  if (state.error) {
    return (
      <>
        <h2>Blog</h2>
        <p>{state.error}</p>
      </>
    );
  }

  const results = state.data?.results || [];

  return (
    <>
      <h2>Blog</h2>
      {results.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className='stack'>
          {results.map((post) => (
            <article key={post.id} className='card post-card'>
              <h3 className='post-title'>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              {post.excerpt ? (
                <p className='post-excerpt'>{post.excerpt}</p>
              ) : null}
              {post.published_date ? (
                <p className='muted'>
                  Published:{" "}
                  {new Date(post.published_date).toLocaleDateString()}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogList;
