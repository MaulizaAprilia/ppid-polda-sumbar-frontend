import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Download } from "lucide-react"
import { dokumen } from "./DataDokumen"

export default function UnduhDokumen() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-white to-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
            📄 Unduh Dokumen Publik
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {dokumen.map((item, index) => (
            <Card
              key={index}
              className="relative bg-gradient-to-br from-blue-950 to-blue-900 border rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.015] transition-all duration-300 ease-in-out overflow-hidden"
            >
              {/* Optional Gradient Border Overlay */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-950 to-blue-900 rounded-5xl z-[-1]"></div>

              <CardHeader className="p-6 pb-3 text-white">
                <CardTitle className="text-xl font-semibold text-white">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-blue-100 mt-1">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 pt-3">
                <a href={item.fileUrl} download>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-white text-blue-950 hover:bg-gray-800 hover:text-white transition-all font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Unduh PDF
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}