import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { FileText, Calendar, AlertCircle, Eye } from "lucide-react"
import { Link } from "react-router-dom"

export default function InformationCategories() {
  const categories = [
    {
      icon: Calendar,
      title: "Informasi Berkala",
      description:
        "Informasi yang wajib disediakan dan diumumkan secara berkala",
      items: [
        "Profil Polda Sumbar",
        "Struktur Organisasi",
        "Program Kerja Tahunan",
        "Laporan Kinerja",
        "Anggaran dan Realisasi",
      ],
      path: "/informasi-berkala",
      colorClasses: {
        border: "border-blue-500",
        bgLight: "bg-blue-100",
        bgHover: "hover:bg-blue-200",
        text: "text-blue-700",
        dot: "bg-blue-500",
        icon: "text-blue-600",
      },
    },
    {
      icon: Eye,
      title: "Informasi Serta Merta",
      description:
        "Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum",
      items: [
        "Informasi Keadaan Darurat",
        "Peringatan Keamanan",
        "Bencana Alam",
        "Gangguan Kamtibmas",
        "Informasi Penting Lainnya",
      ],
      path: "/informasi-serta-merta",
      colorClasses: {
        border: "border-red-500",
        bgLight: "bg-red-100",
        bgHover: "hover:bg-red-200",
        text: "text-red-700",
        dot: "bg-red-500",
        icon: "text-red-600",
      },
    },
    {
      icon: FileText,
      title: "Informasi Setiap Saat",
      description:
        "Informasi yang harus disediakan oleh Polda Sumbar setiap saat",
      items: [
        "Daftar Informasi Publik",
        "Prosedur Pelayanan",
        "Standar Operasional",
        "Formulir Permohonan",
        "Kontak Layanan",
      ],
      path: "/informasi-setiap-saat",
      colorClasses: {
        border: "border-green-500",
        bgLight: "bg-green-100",
        bgHover: "hover:bg-green-200",
        text: "text-green-700",
        dot: "bg-green-500",
        icon: "text-green-600",
      },
    },
    {
      icon: AlertCircle,
      title: "Informasi Dikecualikan",
      description:
        "Informasi yang dikecualikan sesuai dengan ketentuan perundang-undangan",
      items: [
        "Rahasia Negara",
        "Informasi Penyidikan",
        "Data Pribadi",
        "Strategi Keamanan",
        "Informasi Rahasia Lainnya",
      ],
      path: "/informasi-dikecualikan",
      colorClasses: {
        border: "border-gray-500",
        bgLight: "bg-gray-100",
        bgHover: "hover:bg-gray-200",
        text: "text-gray-700",
        dot: "bg-gray-500",
        icon: "text-gray-600",
      },
    },
  ]

  return (
    <section id="informasi" className="py-20 bg-white">
      <div className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Informasi Publik
          </h1>
          <div className="grid lg:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card
                key={index}
                className={`border-2 ${category.colorClasses.border} ${category.colorClasses.bgLight}/40 hover:shadow-xl transition-all duration-300 rounded-xl`}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 ${category.colorClasses.bgLight} rounded-lg flex items-center justify-center`}
                    >
                      <category.icon className={`w-6 h-6 ${category.colorClasses.icon}`} />
                    </div>
                    <CardTitle className="text-xl text-gray-900">
                      {category.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-700 mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 ${category.colorClasses.dot} rounded-full`}></div>
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={category.path}>
                    <Button
                      variant="outline"
                      className={`
                        w-full
                        ${category.colorClasses.bgLight}
                        ${category.colorClasses.text}
                        ${category.colorClasses.bgHover}
                        transition-all duration-200
                        shadow
                      `}
                    >
                      Lihat Detail
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

