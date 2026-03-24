import React, { useEffect, useState } from 'react';

// Vite env var: VITE_API_URL. Fallback to localhost
const API = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:5000/api/books';

const emptyForm = { name: '', title: '', author: '', price: '', publishDate: '' };

const Home = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchBooks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.title || !form.author) {
      alert('Please fill `name`, `title`, and `author`.');
      return;
    }

    try {
      setSaving(true);
      const payload = { ...form };
      // coerce price to number if provided
      if (payload.price !== '') payload.price = Number(payload.price);

      let res;
      if (editingId) {
        res = await fetch(`${API}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Failed to save');
      }

      setForm(emptyForm);
      setEditingId(null);
      await fetchBooks();
    } catch (err) {
      console.error(err);
      alert('Save failed: ' + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setForm({
      name: book.name || '',
      title: book.title || '',
      author: book.author || '',
      price: book.price || '',
      publishDate: book.publishDate ? book.publishDate.split('T')[0] : ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchBooks();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="w-full px-5 min-h[calc(100vh-60px)]">
      <h2 className="text-xl font-bold my-4">Books CRUD</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-3 mb-4">
        <div className="col-span-2 flex flex-col gap-2">
          <label>Book Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded p-1" />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label>Book Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded p-1" />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label>Author</label>
          <input name="author" value={form.author} onChange={handleChange} className="w-full border rounded p-1" />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label>Selling Price</label>
          <input name="price" value={form.price} onChange={handleChange} className="w-full border rounded p-1" />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label>Publish Date</label>
          <input type="date" name="publishDate" value={form.publishDate} onChange={handleChange} className="w-full border rounded p-1" />
        </div>

        <div className="col-span-6 flex gap-2 justify-end mt-2">
          {editingId && <button type="button" onClick={handleCancel} className="px-3 py-1 border rounded">Cancel</button>}
          <button type="submit" disabled={saving} className="bg-gray-700 text-white h-9 px-4 rounded-md disabled:opacity-60">
            {saving ? (editingId ? 'Updating...' : 'Saving...') : (editingId ? 'Update' : 'Create')}
          </button>
        </div>
      </form>

      <div className="w-full mt-6">
        <table className="w-full bg-white divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Book Name</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Publish</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{b.name}</td>
                <td className="px-4 py-2">{b.title}</td>
                <td className="px-4 py-2">{b.author}</td>
                <td className="px-4 py-2">{b.price}</td>
                <td className="px-4 py-2">{b.publishDate ? b.publishDate.split('T')[0] : ''}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEdit(b)} className="mr-2 px-2 py-1 border rounded">Edit</button>
                  <button onClick={() => handleDelete(b._id)} className="px-2 py-1 border rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
