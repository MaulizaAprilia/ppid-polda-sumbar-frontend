import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RotateCcw } from "lucide-react"
import FormAdminInformation from "./FormAdminInformation"

interface Informasi {
  _id: string
  judul: string
  isi: string
  kategori: string
  dibuatPada: string
}

export default function AdminInformation() {
  const [data, setData] = useState<Informasi[]>([])
  const [loading, setLoading] = useState(true)
  const [editData, setEditData] = useState<Informasi | null>(null)
  const navigate = useNavigate()

  const fetchInformasi = () => {
    setLoading(true)
    fetch("http://localhost:5000/api/informasi")
      .then((res) => res.json())
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err)
        setLoading(false)
      })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus informasi ini?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/informasi/${id}`, {
          method: "DELETE",
        })
        if (res.ok) {
          fetchInformasi()
        } else {
          const error = await res.json()
          console.error("Gagal menghapus:", error)
          alert("Gagal menghapus data: " + error.message)
        }
      } catch (err) {
        console.error("Gagal:", err)
        alert("Terjadi kesalahan saat menghapus data.")
      }
    }
  }

  const handleEdit = (item: Informasi) => {
    setEditData(item)
  }

  useEffect(() => {
    fetchInformasi()
  }, [])

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
          onClick={fetchInformasi}
          className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editData ? "Edit Informasi" : "Tambah Informasi"}
        </h2>
        <FormAdminInformation
          onSuccess={() => {
            fetchInformasi()
            setEditData(null)
          }}
          editData={editData}
          onCancelEdit={() => setEditData(null)}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-lg">Memuat data...</div>
      ) : data.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-lg">Tidak ada data informasi ditemukan.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Judul</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Deskripsi</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Waktu</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((info) => (
                <tr key={info._id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 font-medium max-w-xs truncate" title={info.judul}>{info.judul}</td>
                  <td className="px-6 py-4 max-w-xl truncate" title={info.isi}>{info.isi}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {info.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(info.dibuatPada).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(info)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(info._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
