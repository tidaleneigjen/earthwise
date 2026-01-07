import React, { useEffect, useMemo, useState } from "react";
import { listBooks, toAbsoluteMediaUrl } from "../api";
import { Link } from "react-router-dom";

const Books = () => {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const data = await listBooks();
        if (!mounted) return;
        setState({ loading: false, error: "", data });
      } catch (e) {
        if (!mounted) return;
        setState({
          loading: false,
          error: e?.message || "Failed to load books",
          data: null,
        });
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  const books = useMemo(() => {
    const results = state.data?.results;
    if (Array.isArray(results)) return results;
    if (Array.isArray(state.data)) return state.data;
    return [];
  }, [state.data]);

  if (state.loading) {
    return (
      <>
        <h2>Books</h2>
        <p>Loading…</p>
      </>
    );
  }

  if (state.error) {
    return (
      <>
        <h2>Books</h2>
        <p>{state.error}</p>
      </>
    );
  }

  if (books.length === 0) {
    return (
      <>
        <h2>Books</h2>
        <p>No books yet.</p>
      </>
    );
  }

  return (
    <>
      <h2>Books</h2>
      <div className='stack'>
        {books.map((book) => {
          const coverUrl = toAbsoluteMediaUrl(book.cover_image);
          return (
            <article key={book.id} className='card book-list-item'>
              <div className='book-list-media'>
                {coverUrl ? (
                  <img
                    className='book-list-cover'
                    src={coverUrl}
                    alt={book.title}
                  />
                ) : null}
              </div>
              <div className='book-list-body'>
                <h3 className='book-title'>
                  <Link to={`/books/${book.slug}`}>{book.title}</Link>
                </h3>
                {book.description ? (
                  <p className='muted book-summary'>{book.description}</p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Books;
