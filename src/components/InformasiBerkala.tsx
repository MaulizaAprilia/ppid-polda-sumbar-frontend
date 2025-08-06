import React, { useRef, useState } from "react"
import { ArrowLeft, FileText, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function InformasiBerkala() {
    const detailRef = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()

    const informasiList = [
        {
        title: "Profil Polda Sumbar",
        description: `Kepolisian Daerah Sumatera Barat (Polda Sumbar) ...`,
        },
        {
        title: "Struktur Organisasi",
        description: `Struktur organisasi Polda Sumbar ...`,
        },
        {
        title: "Program Kerja Tahunan",
        description: `Program Kerja Tahunan Polda Sumbar ...`,
        },
        {
        title: "Laporan Kinerja",
        description: `Laporan Kinerja Polda Sumbar ...`,
        },
        {
        title: "Anggaran dan Realisasi",
        description: `Informasi anggaran dan realisasi Polda Sumbar ...`,
        },
    ]

    const [selectedInfo, setSelectedInfo] = useState<null | typeof informasiList[0]>(null)

    const handleClick = (item: typeof informasiList[0]) => {
        setSelectedInfo(item)
        // Scroll setelah state berubah
        setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-10 px-4 md:px-16 lg:px-32">
        {/* Tombol Kembali */}
        <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-700 hover:underline mb-8 transition"
        >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-base font-medium">Kembali</span>
        </button>

        {/* Judul */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Detail Informasi Berkala</h1>
        <p className="text-gray-600 mb-10 text-lg max-w-2xl">
            Informasi berkala adalah informasi yang wajib diumumkan secara rutin oleh Polda Sumatera Barat untuk menjamin transparansi kepada masyarakat.
        </p>

        {/* Daftar Informasi */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 mb-10">
            {informasiList.map((item, index) => (
            <button
                key={index}
                onClick={() => handleClick(item)}
                className="w-full text-left flex items-center space-x-3 p-4 rounded-md hover:bg-blue-50 transition cursor-pointer group"
            >
                <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                <FileText className="w-5 h-5" />
                </div>
                <span className="text-lg text-gray-800 group-hover:text-blue-700 font-medium">
                {item.title}
                </span>
            </button>
            ))}
        </div>

        {/* Panel Informasi Terpilih */}
        {selectedInfo && (
            <div
            ref={detailRef}
            className="bg-white border-l-4 border-blue-600 shadow-md rounded-xl p-6 space-y-4"
            >
            <div className="flex items-center space-x-3 mb-4">
                <Info className="text-blue-600 w-5 h-5" />
                <h2 className="text-2xl font-semibold text-gray-800">{selectedInfo.title}</h2>
            </div>

            {/* Custom content for "Profil Polda Sumbar" */}
            {selectedInfo.title === "Profil Polda Sumbar" ? (
                <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <img
                    src="/logo_polda.png"
                    alt="Logo Polda"
                    className="w-32 h-32 object-contain mx-auto md:mx-0"
                    />
                    <p className="text-gray-700 text-base leading-relaxed text-justify max-w-3xl mx-auto">
                    Kepolisian Daerah Sumatera Barat (Polda Sumbar) adalah instansi kepolisian di bawah Kepolisian Negara Republik Indonesia yang bertanggung jawab atas wilayah Provinsi Sumatera Barat. Polda Sumbar memiliki tugas pokok memelihara keamanan dan ketertiban masyarakat, menegakkan hukum, serta memberikan perlindungan, pengayoman, dan pelayanan kepada masyarakat.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Visi</h3>
                    <p className="italic text-gray-800">
                    "Terwujudnya POLDA SUMBAR yang Prediktif, Responsibilitas, dan Transparansi Berkeadilan (PRESISI)."
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Misi</h3>
                    <ol className="list-decimal list-inside text-gray-800 space-y-1">
                    <li>Memberikan pelayanan publik yang profesional dan humanis.</li>
                    <li>Menegakkan hukum secara transparan dan berkeadilan.</li>
                    <li>Meningkatkan kualitas SDM Polri yang unggul dan berintegritas.</li>
                    <li>Menjaga keamanan dan ketertiban melalui sinergi dengan masyarakat.</li>
                    </ol>
                </div>
                </div>
            ) : (
                <pre className="whitespace-pre-line text-gray-700 text-base leading-relaxed">
                {selectedInfo.description}
                </pre>
            )}
            </div>
        )}
        </div>
    )
}