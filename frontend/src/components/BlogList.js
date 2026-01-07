import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listArticles, toAbsoluteMediaUrl } from "../api";

const BlogList = () => {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const data = await listArticles();
        if (!mounted) return;
        setState({ loading: false, error: "", data });
      } catch (e) {
        if (!mounted) return;
        setState({
          loading: false,
          error: e?.message || "Failed to load articles",
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
        <h2>Articles</h2>
        <p>Loading…</p>
      </>
    );
  }

  if (state.error) {
    return (
      <>
        <h2>Articles</h2>
        <p>{state.error}</p>
      </>
    );
  }

  const results = state.data?.results || [];

  const getAuthorName = (post) => {
    const first = post?.author?.first_name || "";
    const last = post?.author?.last_name || "";
    const full = `${first} ${last}`.trim();
    return full || post?.author?.username || "";
  };

  const getExcerpt = (post) => {
    if (post?.excerpt) return post.excerpt;
    const content = post?.content || "";
    const normalized = content.replace(/\s+/g, " ").trim();
    if (normalized.length <= 180) return normalized;
    return `${normalized.slice(0, 180)}…`;
  };

  return (
    <>
      <h2>Articles</h2>
      {results.length === 0 ? (
        <p>No articles yet.</p>
      ) : (
        <div className='stack'>
          {results.map((post) => {
            const thumbUrl = toAbsoluteMediaUrl(post?.featured_image);
            const authorName = getAuthorName(post);
            const excerpt = getExcerpt(post);

            return (
              <article key={post.id} className='card list-item'>
                {thumbUrl ? (
                  <div className='list-item-media'>
                    <img className='thumb' src={thumbUrl} alt={post.title} />
                  </div>
                ) : null}
                <div className='list-item-body'>
                  <h3 className='post-title'>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className='muted meta'>
                    {authorName ? <span>By {authorName}</span> : null}
                    {post.published_date ? (
                      <span>
                        {authorName ? " · " : ""}
                        {new Date(post.published_date).toLocaleDateString()}
                      </span>
                    ) : null}
                  </p>
                  {excerpt ? <p className='post-excerpt'>{excerpt}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BlogList;
