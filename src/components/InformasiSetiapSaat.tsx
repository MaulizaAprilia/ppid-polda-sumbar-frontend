import React, { useState, useRef, useEffect } from "react"
import { ArrowLeft, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function InformasiSetiapSaat() {
    const navigate = useNavigate()

    const informasiList = [
        {
        title: "Dasar Hukum PPID",
        description:
            "Berisi peraturan perundang-undangan yang menjadi dasar hukum pembentukan dan pelaksanaan tugas Pejabat Pengelola Informasi dan Dokumentasi (PPID).",
        },
        {
        title: "Tugas dan Fungsi PPID",
        description:
            "Menjelaskan tanggung jawab, peran, dan fungsi dari PPID dalam menyediakan layanan informasi publik.",
        },
        {
        title: "Daftar Informasi Publik",
        description:
            "Merupakan daftar resmi informasi yang wajib disediakan dan diumumkan oleh Polda Sumbar secara terbuka untuk publik.",
        },
        {
        title: "Laporan Akses Informasi",
        description:
            "Laporan yang memuat statistik dan rekapitulasi permohonan informasi yang diterima dan ditindaklanjuti oleh PPID.",
        },
        {
        title: "Prosedur Permohonan Informasi",
        description:
            "Langkah-langkah dan mekanisme yang harus ditempuh oleh pemohon untuk mengakses informasi publik secara sah.",
        },
        {
        title: "Hak dan Kewajiban Pemohon Informasi",
        description:
            "Penjelasan tentang hak-hak masyarakat dalam memperoleh informasi serta kewajiban yang harus dipatuhi selama proses permohonan.",
        },
        {
        title: "Standar Operasional Prosedur (SOP)",
        description:
            "Dokumen resmi yang mengatur alur pelayanan informasi oleh PPID guna menjamin kecepatan, ketepatan, dan kemudahan.",
        },
        {
        title: "Kontak dan Alamat Layanan Informasi",
        description:
            "Informasi tentang alamat kantor, nomor telepon, email, dan kanal lain untuk menghubungi layanan informasi publik Polda Sumbar.",
        },
    ]

    const [selectedInfo, setSelectedInfo] = useState<null | typeof informasiList[0]>(null)
    const detailRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (selectedInfo && detailRef.current) {
        detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [selectedInfo])

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 py-10 px-4 md:px-16 lg:px-32">
        {/* Tombol Kembali */}
        <button
            onClick={() => navigate(-1)}
            className="flex items-center text-green-700 hover:underline mb-8 transition"
        >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-base font-medium">Kembali</span>
        </button>

        {/* Judul Halaman */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Informasi Setiap Saat
        </h1>
        <p className="text-gray-600 mb-10 text-lg max-w-2xl">
            Informasi setiap saat adalah informasi yang wajib disediakan dan diumumkan secara berkala oleh Polda Sumatera Barat agar dapat diakses oleh publik kapan saja tanpa harus diminta.
        </p>

        {/* Daftar Informasi */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 mb-10">
            {informasiList.map((item, index) => (
            <button
                key={index}
                onClick={() => setSelectedInfo(item)}
                className="w-full text-left flex items-center space-x-3 p-4 rounded-md hover:bg-green-50 transition cursor-pointer group"
            >
                <div className="bg-green-100 text-green-600 rounded-full p-2">
                <Info className="w-5 h-5" />
                </div>
                <span className="text-lg text-gray-800 group-hover:text-green-700 font-medium">
                {item.title}
                </span>
            </button>
            ))}
        </div>

        {/* Panel Deskripsi */}
        {selectedInfo && (
            <div
            ref={detailRef}
            className="bg-white border-l-4 border-green-600 shadow-md rounded-xl p-6"
            >
            <div className="flex items-center space-x-3 mb-4">
                <Info className="text-green-600 w-5 h-5" />
                <h2 className="text-2xl font-semibold text-gray-800">{selectedInfo.title}</h2>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
                {selectedInfo.description}
            </p>
            </div>
        )}
        </div>
    )
}