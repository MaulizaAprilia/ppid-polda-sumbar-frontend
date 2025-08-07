import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import axios from "axios";

interface NewsType {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  time: string;
  author: string;
  image?: string;
  tags: string[];
}

const categories = ["Pengumuman", "Kegiatan", "Laporan", "Kerjasama"];

export default function DashboardAdminNews() {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [formData, setFormData] = useState<Omit<NewsType, "image"> & { image: File | null }>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    date: "",
    time: "",
    author: "",
    image: null,
    tags: [],
  });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setNewsList(res.data);
    } catch (error) {
      console.error("Gagal mengambil berita:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData({ ...formData, tags: value.split(",").map((tag) => tag.trim()) });
    } else if (name === "datetime") {
      const [date, time] = value.split("T");
      setFormData({ ...formData, date, time });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("date", formData.date);
      data.append("time", formData.time);
      data.append("author", formData.author);
      data.append("tags", JSON.stringify(formData.tags));
      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editId) {
        await axios.put(`http://localhost:5000/api/news/${editId}`, data);
      } else {
        await axios.post("http://localhost:5000/api/news", data);
      }

      fetchNews();
      resetForm();
    } catch (error) {
      console.error("Gagal mengirim berita:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/news/${id}`);
        fetchNews();
      } catch (error) {
        console.error("Gagal menghapus berita:", error);
      }
    }
  };

  const handleEdit = (news: NewsType) => {
    setEditId(news._id || null);
    setFormData({
      title: news.title,
      excerpt: news.excerpt,
      content: news.content,
      category: news.category,
      date: news.date,
      time: news.time,
      author: news.author,
      image: null,
      tags: news.tags,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      date: "",
      time: "",
      author: "",
      image: null,
      tags: [],
    });
    setEditId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 px-4 py-2 rounded-xl shadow"
        >
          ← Kembali ke Dashboard
        </button>
        <button
          onClick={fetchNews}
          className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Form Tambah/Edit */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Berita" : "Tambah Berita"}
        </h2>
        <div className="grid gap-4 mb-4">
          <input name="title" placeholder="Judul" value={formData.title} onChange={handleChange} className="border p-2 rounded" />
          <input name="excerpt" placeholder="Excerpt" value={formData.excerpt} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="content" placeholder="Konten" value={formData.content} onChange={handleChange} className="border p-2 rounded" />
          <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input type="datetime-local" name="datetime" value={formData.date && formData.time ? `${formData.date}T${formData.time}` : ""} onChange={handleChange} className="border p-2 rounded" />
          <input name="author" placeholder="Penulis" value={formData.author} onChange={handleChange} className="border p-2 rounded" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
          <input name="tags" placeholder="Tag (pisahkan dengan koma)" value={formData.tags.join(",")} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <div className="flex gap-2">
          <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">
            {editId ? "Update Berita" : "Tambah Berita"}
          </button>
          {editId && (
            <button onClick={resetForm} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl">
              Batal
            </button>
          )}
        </div>
      </div>

      {/* Daftar Berita */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Judul</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Kategori</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Waktu</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Gambar</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Tag</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {newsList.map((news) => (
              <tr key={news._id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 font-medium max-w-xs truncate">{news.title}</td>
                <td className="px-6 py-4">{news.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {news.date} {news.time}
                </td>
                <td className="px-6 py-4">
                  {news.image && (
                    <img src={news.image} alt={news.title} className="h-12 w-20 object-cover rounded shadow" />
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {news.tags.map((tag, i) => (
                    <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 mr-1 rounded-full">#{tag}</span>
                  ))}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => news._id && handleEdit(news)} className="text-sm text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => news._id && handleDelete(news._id)} className="text-sm text-red-600 hover:underline">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {newsList.length === 0 && (
          <div className="text-center py-8 text-gray-500">Belum ada berita yang ditambahkan.</div>
        )}
      </div>
    </div>
  );
}