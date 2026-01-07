import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, toAbsoluteMediaUrl } from "../api";

const BlogDetail = () => {
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const data = await getArticle(slug);
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
          <Link to='/blog'>Back to Articles</Link>
        </p>
        <h2>Loading…</h2>
      </>
    );
  }

  if (state.error) {
    return (
      <>
        <p className='muted'>
          <Link to='/blog'>Back to Articles</Link>
        </p>
        <h2>Article</h2>
        <p>{state.error}</p>
      </>
    );
  }

  const post = state.data;
  const imageUrl = toAbsoluteMediaUrl(post?.featured_image);
  const authorName =
    `${post?.author?.first_name || ""} ${
      post?.author?.last_name || ""
    }`.trim() ||
    post?.author?.username ||
    "";

  return (
    <>
      <p className='muted'>
        <Link to='/blog'>Back to Articles</Link>
      </p>
      <h2>{post.title}</h2>
      <p className='muted meta'>
        {authorName ? <span>By {authorName}</span> : null}
        {post.published_date ? (
          <span>
            {authorName ? " · " : ""}
            {new Date(post.published_date).toLocaleDateString()}
          </span>
        ) : null}
      </p>
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
