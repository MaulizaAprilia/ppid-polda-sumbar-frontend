import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Table, TableHeader, TableBody, TableRow,
    TableHead, TableCell
} from "../components/ui/table"
import {
    LogOut, Newspaper, Folder, RotateCcw,
    Filter, Search, Users, Clock, Info
} from "lucide-react"

interface RequestData {
    _id?: string
    name: string
    email: string
    phone: string
    address: string
    category: string
    subject: string
    description: string
    purpose: string
    submittedAt: string
}

// Format tanggal custom
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Invalid Date"

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    const dayName = days[date.getDay()]

    const pad = (n: number) => n.toString().padStart(2, '0')

    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1)
    const year = date.getFullYear()
    const hour = pad(date.getHours())
    const minute = pad(date.getMinutes())
    const second = pad(date.getSeconds())

    return `${dayName}, ${day}-${month}-${year}, ${hour}:${minute}:${second}`
}

export default function AdminDashboard() {
    const [requests, setRequests] = useState<RequestData[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const navigate = useNavigate()

    const fetchData = () => {
        setLoading(true)
        fetch("http://localhost:5000/api/request")
            .then(res => res.json())
            .then(data => {
                setRequests(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch requests", err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated")
        navigate("/")
    }

    const filteredRequests = requests.filter((req) => {
        const searchMatch =
            req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email.toLowerCase().includes(searchTerm.toLowerCase())
        const categoryMatch =
            selectedCategory === "" || req.category === selectedCategory
        return searchMatch && categoryMatch
    })

    return (
        <div className="min-h-screen flex bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-950 text-white p-6 flex flex-col justify-between shadow-xl">
                <div>
                    <h2 className="text-2xl font-bold mb-9 mt-5 tracking-wide">📊 Admin Panel</h2>
                    <nav className="space-y-4">
                        <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-800 transition">
                            <Folder className="w-5 h-5" /> Permohonan
                        </button>
                        <button
                            onClick={() => navigate("/tambah-berita")}
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-800 transition"
                        >
                            <Newspaper className="w-5 h-5" /> Tambah Berita
                        </button>
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-700 hover:bg-red-700 transition"
                >
                    <LogOut className="w-5 h-5" /> Keluar
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Header Bar (Dynamic Title) */}
                <section className="bg-gradient-to-r from-blue-900 to-blue-400 text-white p-10 shadow-md">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight drop-shadow-xl">
                                {window.location.pathname === "/tambah-berita" ? "📰 Tambah Berita" : "📄 Permohonan Informasi Publik"}
                            </h1>
                            <p className="text-lrg mt-7 text-blue-100">
                                {window.location.pathname === "/tambah-berita"
                                    ? "Form untuk menambahkan berita baru"
                                    : "Dashboard untuk mengelola data permohonan masuk"}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold">Total Permohonan</p>
                            <p className="text-5xl font-bold drop-shadow-lg">{requests.length}</p>
                        </div>
                    </div>
                </section>

                {/* Hanya tampilkan bagian permohonan jika bukan di halaman tambah berita */}
                {window.location.pathname !== "/tambah-berita" && (
                    <>
                        {/* Stat Cards */}
                        <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border-b shadow-sm">
                            <div className="bg-blue-200 p-4 rounded-xl flex items-center gap-4 shadow">
                                <Users className="text-blue-800 w-8 h-8" />
                                <div>
                                    <p className="text-sm font-bold text-blue-800">Total Pengguna</p>
                                    <p className="text-lg font-semibold text-blue-800">{requests.length}</p>
                                </div>
                            </div>
                            <div className="bg-green-200 p-4 rounded-xl flex items-center gap-4 shadow">
                                <Clock className="text-green-800 w-8 h-8" />
                                <div>
                                    <p className="text-sm font-bold text-green-800">Permohonan Hari Ini</p>
                                    <p className="text-lg font-semibold text-green-800">
                                        {requests.filter(req => {
                                            const today = new Date()
                                            const submittedDate = new Date(req.submittedAt)
                                            return submittedDate.toDateString() === today.toDateString()
                                        }).length}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-yellow-200 p-4 rounded-xl flex items-center gap-4 shadow">
                                <Info className="text-yellow-800 w-8 h-8" />
                                <div>
                                    <p className="text-sm font-bold text-yellow-800">Kategori Unik</p>
                                    <p className="text-lg font-semibold text-yellow-800">
                                        {[...new Set(requests.map(r => r.category))].length}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Filter & Search */}
                        <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 bg-white shadow-sm border-b">
                            <div className="flex items-center gap-2 w-full md:w-1/2">
                                <Search className="w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Cari nama atau email..."
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-900"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-1/2">
                                <Filter className="w-5 h-5 text-gray-500" />
                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring  focus:border-blue-500"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Kategori</option>
                                    <option value="Informasi Berkala">Informasi Berkala</option>
                                    <option value="Informasi Serta Merta">Informasi Serta Merta</option>
                                    <option value="Informasi Setiap Saat">Informasi Setiap Saat</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                                <button
                                    onClick={fetchData}
                                    className="ml-auto text-blue-700 hover:text-blue-900 transition flex items-center gap-2 border px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-100"
                                >
                                    <RotateCcw className="w-4 h-4" /> Refresh
                                </button>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="p-6 overflow-auto">
                            {loading ? (
                                <p className="text-center py-10 text-gray-500">Memuat data permohonan...</p>
                            ) : filteredRequests.length === 0 ? (
                                <p className="text-center py-10 text-gray-500">Tidak ditemukan permohonan.</p>
                            ) : (
                                <div className="rounded-xl border bg-white shadow-md overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-300 text-gray-700">
                                                <TableHead className="text-center">No</TableHead>
                                                <TableHead>Nama</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Telepon</TableHead>
                                                <TableHead>Kategori</TableHead>
                                                <TableHead>Alamat</TableHead>
                                                <TableHead>Judul</TableHead>
                                                <TableHead>Rincian</TableHead>
                                                <TableHead>Tujuan</TableHead>
                                                <TableHead>Waktu</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredRequests.map((req, index) => (
                                                <TableRow key={req._id || index} className="hover:bg-blue-50/30">
                                                    <TableCell className="text-center font-bold text-gray-600">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>{req.name}</TableCell>
                                                    <TableCell>{req.email}</TableCell>
                                                    <TableCell>{req.phone}</TableCell>
                                                    <TableCell>
                                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                                            req.category === "Informasi Berkala"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : req.category === "Informasi Serta Merta"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : req.category === "Informasi Setiap Saat"
                                                                        ? "bg-yellow-100 text-yellow-800"
                                                                        : "bg-gray-100 text-gray-800"
                                                        }`}>
                                                            {req.category}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{req.address}</TableCell>
                                                    <TableCell>{req.subject}</TableCell>
                                                    <TableCell>{req.description}</TableCell>
                                                    <TableCell>{req.purpose}</TableCell>
                                                    <TableCell>{formatDate(req.submittedAt)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}
