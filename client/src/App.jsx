import { useEffect, useState } from "react";
import { getBookmarks, createBookmark, deleteBookmark } from "./api";
import "./App.css";

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getBookmarks().then(setBookmarks).catch((err) => setError(err.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url || !title) return;
    try {
      const bookmark = await createBookmark({ url, title });
      setBookmarks((prev) => [bookmark, ...prev]);
      setUrl("");
      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="stash">
      <h1>Stash</h1>

      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="url"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="bookmark-list">
        {bookmarks.map((b) => (
          <li key={b.id}>
            <a href={b.url} target="_blank" rel="noreferrer">
              {b.title}
            </a>
            <button onClick={() => handleDelete(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
