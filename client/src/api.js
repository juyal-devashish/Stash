const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getBookmarks() {
  const res = await fetch(`${API_URL}/api/bookmarks`);
  if (!res.ok) throw new Error("Failed to fetch bookmarks");
  return res.json();
}

export async function createBookmark(bookmark) {
  const res = await fetch(`${API_URL}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookmark),
  });
  if (!res.ok) throw new Error("Failed to create bookmark");
  return res.json();
}

export async function deleteBookmark(id) {
  const res = await fetch(`${API_URL}/api/bookmarks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete bookmark");
}
