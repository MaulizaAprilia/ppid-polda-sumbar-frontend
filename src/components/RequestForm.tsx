import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select } from "../components/ui/select"
import { FileText, Send } from "lucide-react"


interface RequestFormProps {
  onSubmit?: (data: {
    name: string
    email: string
    phone: string
    address: string
    category: string
    subject: string
    description: string
    purpose: string
  }) => void
}

export default function RequestForm({ onSubmit }: RequestFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    subject: "",
    description: "",
    purpose: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        const response = await fetch("http://localhost:5000/api/request/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })

        if (!response.ok) throw new Error("Gagal mengirim permohonan")
        alert("Permohonan Anda telah dikirim. Kami akan memproses dalam 1x24 jam.")
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        category: "",
        subject: "",
        description: "",
        purpose: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      subject: "",
      description: "",
      purpose: "",
    })
  }

  return (
    <section
      id="permohonan"
      className="py-24 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background-abstract.jpg')" }}
    >

      <div className="relative container mx-auto px-4 animate-fadeIn z-20">
        <div className="text-center mb-16 text-black drop-shadow-xl">
          <h2 className="text-4xl font-bold mb-2">Formulir Permohonan Informasi</h2>
          <p className="text-lg text-gray-600">Silakan isi data berikut untuk permintaan informasi publik.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border border-blue-950 rounded-3xl bg-gradient-to-r from-blue-950 to-blue-900 backdrop-blur-md">
            <CardHeader className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-t-3xl px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white font-bold">
                    Permohonan Informasi Publik
                  </CardTitle>
                  <CardDescription className="text-white">
                    Harap isi seluruh kolom dengan data valid.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-8 py-10 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-white mb-2 block">Kategori Informasi *</Label>
                    <Select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      required
                    >
                      <option value="">Pilih kategori</option>
                      <option value="Informasi Berkala">Informasi Berkala</option>
                      <option value="Informasi Serta Merta">Informasi Serta Merta</option>
                      <option value="Informasi Setiap Saat">Informasi Setiap Saat</option>
                      <option value="Lainnya">Lainnya</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-white mb-2 block">Alamat Lengkap *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white mb-2 block">Judul Permohonan *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Ringkasan informasi yang diminta"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white mb-2 block">Rincian Informasi yang Diminta *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Jelaskan secara detail informasi yang Anda butuhkan"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="purpose" className="text-white mb-2 block">Tujuan Penggunaan Informasi *</Label>
                  <Textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    placeholder="Tujuan dari permohonan informasi"
                    rows={3}
                    required
                  />
                </div>


                <div className="bg-gray-300 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Catatan Penting:</h4>
                  <ul className="text-sm text-blue-900 list-disc pl-5 space-y-1">
                    <li>Permohonan akan diproses maksimal 10 hari kerja</li>
                    <li>Informasi yang dikecualikan tidak akan diberikan</li>
                    <li>Pastikan data yang diisi sudah benar dan lengkap</li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isSubmitting}
                    className="text-blue-900 hover:bg-blue-300"
                  >
                    Reset Form
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-700 to-blue-500 hover:brightness-110 text-white shadow-md"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Mengirim..." : "Kirim Permohonan"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}