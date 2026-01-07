import React, { useEffect, useMemo, useState } from "react";
import { listLinks } from "../api";

const Links = () => {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const data = await listLinks();
        if (!mounted) return;
        setState({ loading: false, error: "", data });
      } catch (e) {
        if (!mounted) return;
        setState({
          loading: false,
          error: e?.message || "Failed to load links",
          data: null,
        });
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  const links = useMemo(() => {
    const results = state.data?.results;
    if (Array.isArray(results)) return results;
    if (Array.isArray(state.data)) return state.data;
    return [];
  }, [state.data]);

  if (state.loading) {
    return (
      <>
        <h2>Links</h2>
        <p>Loading…</p>
      </>
    );
  }

  if (state.error) {
    return (
      <>
        <h2>Links</h2>
        <p>{state.error}</p>
      </>
    );
  }

  if (links.length === 0) {
    return (
      <>
        <h2>Links</h2>
        <p>No links yet.</p>
      </>
    );
  }

  return (
    <>
      <h2>Links</h2>
      <div className='stack'>
        {links.map((link) => (
          <article key={link.id} className='card'>
            <h3 className='post-title'>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.title}
              </a>
            </h3>
            {link.summary ? <p className='muted'>{link.summary}</p> : null}
          </article>
        ))}
      </div>
    </>
  );
};

export default Links;
