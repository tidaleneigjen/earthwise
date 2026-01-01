import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogPost, toAbsoluteMediaUrl } from "../api";

const BlogDetail = () => {
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const data = await getBlogPost(slug);
        if (!mounted) return;
        setState({ loading: false, error: "", data });
      } catch (e) {
        if (!mounted) return;
        setState({
          loading: false,
          error: e?.message || "Failed to load post",
          data: null,
        });
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (state.loading) {
    return (
      <>
        <p className='muted'>
          <Link to='/blog'>Back to Blog</Link>
        </p>
        <h2>Loading…</h2>
      </>
    );
  }

  if (state.error) {
    return (
      <>
        <p className='muted'>
          <Link to='/blog'>Back to Blog</Link>
        </p>
        <h2>Blog Post</h2>
        <p>{state.error}</p>
      </>
    );
  }

  const post = state.data;
  const imageUrl = toAbsoluteMediaUrl(post?.featured_image);

  return (
    <>
      <p className='muted'>
        <Link to='/blog'>Back to Blog</Link>
      </p>
      <h2>{post.title}</h2>
      {post.published_date ? (
        <p className='muted'>
          Published: {new Date(post.published_date).toLocaleDateString()}
        </p>
      ) : null}
      {imageUrl ? (
        <div className='media'>
          <img className='responsive-image' src={imageUrl} alt={post.title} />
        </div>
      ) : null}
      <div className='prose'>{post.content}</div>
    </>
  );
};

export default BlogDetail;
