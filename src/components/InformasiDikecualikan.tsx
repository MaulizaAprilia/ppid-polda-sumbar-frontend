import React, { useState, useRef, useEffect } from "react"
import { ArrowLeft, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function InformasiDikecualikan() {
  const navigate = useNavigate()

  const informasiList = [
    {
      title: "Informasi yang membahayakan pertahanan dan keamanan negara",
      description:
        "Meliputi informasi yang jika dibuka dapat mengganggu stabilitas nasional, operasi militer, strategi pertahanan, atau rahasia militer lainnya.",
    },
    {
      title: "Informasi yang berkaitan dengan perlindungan hak pribadi",
      description:
        "Termasuk data pribadi, riwayat kesehatan, keuangan, dan informasi lain yang bersifat privat yang dilindungi undang-undang.",
    },
    {
      title: "Informasi yang dapat menghambat proses penegakan hukum",
      description:
        "Seperti bukti dalam proses penyidikan, strategi penyidikan, atau identitas informan yang dilindungi untuk menjaga keberhasilan proses hukum.",
    },
    {
      title: "Informasi yang bersifat rahasia sesuai undang-undang",
      description:
        "Informasi yang diklasifikasikan sebagai rahasia berdasarkan peraturan perundang-undangan, seperti rahasia negara, rahasia bank, atau rahasia dagang.",
    },
    {
      title: "Informasi yang mengungkap rahasia dagang/industri",
      description:
        "Termasuk formula, praktik bisnis, dan strategi yang memiliki nilai ekonomi dan dijaga kerahasiaannya oleh badan publik atau pihak ketiga.",
    },
    {
      title: "Informasi yang membahayakan keselamatan pejabat publik",
      description:
        "Jika dipublikasikan dapat membahayakan nyawa, fisik, atau keselamatan pejabat negara maupun keluarganya.",
    },
  ]

  const [selectedInfo, setSelectedInfo] = useState<null | typeof informasiList[0]>(null)
  const detailRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll ke deskripsi saat selectedInfo berubah
  useEffect(() => {
    if (selectedInfo && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [selectedInfo])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 md:px-16 lg:px-32">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:underline mb-8 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-base font-medium">Kembali</span>
      </button>

      {/* Judul Halaman */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Informasi yang Dikecualikan
      </h1>
      <p className="text-gray-600 mb-10 text-lg max-w-3xl">
        Informasi dikecualikan adalah informasi yang tidak dapat diakses oleh publik sesuai dengan ketentuan peraturan perundang-undangan karena berpotensi mengganggu kepentingan tertentu seperti keamanan negara, privasi, atau proses hukum.
      </p>

      {/* Daftar Informasi */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 mb-10">
        {informasiList.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedInfo(item)}
            className="w-full text-left flex items-center space-x-3 p-4 rounded-md hover:bg-gray-100 transition cursor-pointer group"
          >
            <div className="bg-gray-200 text-gray-700 rounded-full p-2">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-lg text-gray-800 group-hover:text-gray-900 font-medium">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* Deskripsi Informasi */}
      {selectedInfo && (
        <div
          ref={detailRef}
          className="bg-white border-l-4 border-gray-600 shadow-md rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="text-gray-600 w-5 h-5" />
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