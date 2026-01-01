import React, { useEffect, useMemo, useState } from "react";
import { listBooks, toAbsoluteMediaUrl } from "../api";

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
            <section key={book.id} className='card book-card'>
              <h3 className='book-title'>{book.title}</h3>
              {coverUrl ? (
                <div className='media'>
                  <img
                    className='responsive-image'
                    src={coverUrl}
                    alt={book.title}
                  />
                </div>
              ) : null}
              {book.description ? (
                <div className='prose'>{book.description}</div>
              ) : null}
              {book.purchase_url ? (
                <p>
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
            </section>
          );
        })}
      </div>
    </>
  );
};

export default Books;
