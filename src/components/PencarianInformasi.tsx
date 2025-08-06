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

export default function PencarianInformasi() {
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
      color: "blue",
      path: "/informasi-berkala",
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
      color: "red",
      path: "/informasi-serta-merta",
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
      color: "green",
      path: "/informasi-setiap-saat",
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
      color: "gray",
      path: "/informasi-dikecualikan",
    },
  ]

    return (
        <div className="min-h-screen bg-white py-20 px-4">
            <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
                Informasi Publik
            </h1>
            <div className="grid lg:grid-cols-2 gap-8">
                {categories.map((category, index) => (
                <Card
                    key={index}
                    className={`border-2 border-${category.color}-500 bg-${category.color}-100/40 hover:shadow-xl transition-all duration-300 rounded-xl`}
                >
                    <CardHeader>
                    <div className="flex items-center space-x-4">
                        <div
                        className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}
                        >
                        <category.icon
                            className={`w-6 h-6 text-${category.color}-600`}
                        />
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
                        <li
                            key={itemIndex}
                            className="flex items-center space-x-2"
                        >
                            <div
                            className={`w-2 h-2 bg-${category.color}-500 rounded-full`}
                            ></div>
                            <span className="text-gray-800">{item}</span>
                        </li>
                        ))}
                    </ul>
                    <Link to={category.path}>
                        <Button
                        variant="outline"
                        className={`
                            w-full
                            bg-${category.color}-100
                            text-${category.color}-700
                            hover:bg-${category.color}-200
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
    )
}