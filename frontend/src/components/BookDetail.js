import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook, toAbsoluteMediaUrl } from "../api";

const BookDetail = () => {
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const data = await getBook(slug);
        if (!mounted) return;
        setState({ loading: false, error: "", data });
      } catch (e) {
        if (!mounted) return;
        setState({
          loading: false,
          error: e?.message || "Failed to load book",
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
        <h2>Book</h2>
        <p>Loading…</p>
      </>
    );
  }

  if (state.error) {
    return (
      <>
        <h2>Book</h2>
        <p>{state.error}</p>
        <p>
          <Link to='/books'>Back to Books</Link>
        </p>
      </>
    );
  }

  const book = state.data;
  const coverUrl = toAbsoluteMediaUrl(book.cover_image);
  const authorName =
    [book.author_first_name, book.author_last_name].filter(Boolean).join(" ") ||
    "Anu Dudley";

  return (
    <>
      <p className='muted'>
        <Link to='/books'>Back to Books</Link>
      </p>

      <section className='book-detail-hero'>
        <div>
          {coverUrl ? (
            <img
              className='book-detail-cover'
              src={coverUrl}
              alt={book.title}
            />
          ) : null}
        </div>

        <div className='book-detail-headings'>
          <h2 className='book-detail-title'>{book.title}</h2>
          <p className='muted book-detail-byline-text'>by {authorName}</p>
          {book.purchase_url ? (
            <p className='book-detail-byline'>
              <a
                className='button'
                href={book.purchase_url}
                target='_blank'
                rel='noreferrer'
              >
                Purchase
              </a>
            </p>
          ) : null}
        </div>
      </section>

      {book.description ? (
        <section className='card'>
          <p className='prose book-detail-summary'>{book.description}</p>
        </section>
      ) : null}

      {book.detail_content ? (
        <section className='card'>
          <div className='prose book-detail-extra'>{book.detail_content}</div>
        </section>
      ) : null}
    </>
  );
};

export default BookDetail;
