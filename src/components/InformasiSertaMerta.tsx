import React, { useState, useRef, useEffect } from "react"
import { ArrowLeft, AlertTriangle, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function InformasiSertaMerta() {
    const navigate = useNavigate()

    const informasiList = [
        {
        title: "Informasi Bencana Alam",
        description:
            "Memberikan laporan segera mengenai kejadian bencana seperti gempa bumi, banjir, dan tanah longsor di wilayah Sumatera Barat.",
        },
        {
        title: "Gangguan Keamanan dan Ketertiban",
        description:
            "Informasi terkait situasi yang mengancam ketertiban umum seperti demonstrasi besar, kerusuhan, atau konflik sosial.",
        },
        {
        title: "Perubahan Kebijakan Penting",
        description:
            "Pengumuman mengenai perubahan regulasi atau kebijakan publik yang berdampak luas dan mendesak untuk diketahui masyarakat.",
        },
        {
        title: "Pengumuman Darurat Publik",
        description:
            "Informasi mengenai status darurat yang diberlakukan secara resmi oleh pihak berwenang karena alasan tertentu.",
        },
        {
        title: "Penyebaran Penyakit atau Wabah",
        description:
            "Informasi tentang munculnya atau penyebaran penyakit menular yang berpotensi membahayakan masyarakat luas.",
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
        <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-100 py-10 px-4 md:px-16 lg:px-32">
        {/* Tombol Kembali */}
        <button
            onClick={() => navigate(-1)}
            className="flex items-center text-red-700 hover:underline mb-8 transition"
        >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-base font-medium">Kembali</span>
        </button>

        {/* Judul Halaman */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Informasi Serta Merta
        </h1>
        <p className="text-gray-600 mb-10 text-lg max-w-2xl">
            Informasi serta-merta adalah informasi yang wajib diumumkan dengan segera oleh Polda Sumatera Barat karena dapat mengancam hajat hidup orang banyak dan ketertiban umum.
        </p>

        {/* Daftar Informasi */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 mb-10">
            {informasiList.map((item, index) => (
            <button
                key={index}
                onClick={() => setSelectedInfo(item)}
                className="w-full text-left flex items-center space-x-3 p-4 rounded-md hover:bg-red-50 transition cursor-pointer group"
            >
                <div className="bg-red-100 text-red-600 rounded-full p-2">
                <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-lg text-gray-800 group-hover:text-red-700 font-medium">
                {item.title}
                </span>
            </button>
            ))}
        </div>

        {/* Panel Informasi Terpilih */}
        {selectedInfo && (
            <div
            ref={detailRef}
            className="bg-white border-l-4 border-red-600 shadow-md rounded-xl p-6"
            >
            <div className="flex items-center space-x-3 mb-4">
                <Info className="text-red-600 w-5 h-5" />
                <h2 className="text-2xl font-semibold text-gray-800">
                {selectedInfo.title}
                </h2>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
                {selectedInfo.description}
            </p>
            </div>
        )}
        </div>
    )
}