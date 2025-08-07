"use client"

import { Badge } from "../components/ui/badge"
import { Megaphone, FileText, ShieldCheck, Users, Globe2 } from "lucide-react"

export default function AboutPPID() {
    return (
        <section id="tentang-ppid" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
            {/* Heading */}
            <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Tentang PPID 
            </h1>
            <h2 className="text-xl lg:text-4xl font-bold text-gray-900 mb-4">
                Kepolisian Daerah Sumatera Barat
            </h2>"
            <p className="text-lg text-gray-600 mx-auto">
                Mengenal Pejabat Pengelola Informasi dan Dokumentasi (PPID) di lingkungan Kepolisian Daerah Sumbar
            </p>
            </div>

            {/* 2 Kolom */}
            <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Kiri - Artikel */}
            <article className="flex-1 text-justify space-y-10">
                {/* Section 1 */}
                <div>
                <Badge className="bg-blue-600 text-white mb-2">
                    <Megaphone className="w-4 h-4 mr-1 inline" /> Keterbukaan Informasi
                </Badge>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Apa Itu PPID?</h3>
                <p className="text-gray-700 leading-relaxed">
                    PPID (Pejabat Pengelola Informasi dan Dokumentasi) adalah pejabat yang bertanggung jawab dalam pengelolaan dan pelayanan informasi publik di lingkungan POLDA Sumatera Barat. Keberadaan PPID merupakan pelaksanaan dari amanat <strong>Undang-Undang Nomor 14 Tahun 2008</strong> tentang Keterbukaan Informasi Publik.
                </p>
                </div>

                {/* Section 2 */}
                <div>
                <Badge className="bg-green-600 text-white mb-2">
                    <ShieldCheck className="w-4 h-4 mr-1 inline" /> Fungsi & Tugas
                </Badge>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Tugas Utama PPID</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Mengelola dan menyimpan dokumentasi informasi publik.</li>
                    <li>Melayani permintaan informasi dari masyarakat secara cepat, tepat, dan sederhana.</li>
                    <li>Menentukan klasifikasi informasi yang terbuka dan dikecualikan.</li>
                    <li>Melaporkan pelaksanaan layanan informasi secara berkala kepada atasan.</li>
                </ul>
                </div>

                {/* Section 3 */}
                <div>
                <Badge className="bg-purple-600 text-white mb-2">
                    <Users className="w-4 h-4 mr-1 inline" /> Layanan untuk Publik
                </Badge>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Informasi yang Bisa Diakses</h3>
                <p className="text-gray-700 leading-relaxed">
                    Masyarakat dapat mengakses berbagai informasi publik seperti data statistik, anggaran, laporan kegiatan, dan prosedur layanan. Namun beberapa informasi dapat dikecualikan jika menyangkut keamanan negara, privasi, atau proses hukum.
                </p>
                </div>

                {/* Section 4 */}
                <div>
                <Badge className="bg-orange-500 text-white mb-2">
                    <Globe2 className="w-4 h-4 mr-1 inline" /> Akses & Permohonan
                </Badge>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Cara Mengajukan Permohonan Informasi</h3>
                <ul className="list-decimal list-inside text-gray-700 space-y-1">
                    <li>Website resmi PPID POLDA Sumbar</li>
                    <li>Mengisi formulir permohonan informasi</li>
                    <li>Datang langsung ke kantor PPID POLDA Sumbar</li>
                    <li>Melalui email atau nomor kontak resmi</li>
                </ul>
                </div>

                {/* Section 5 */}
                <div>
                <Badge className="bg-gray-800 text-white mb-2">
                    <FileText className="w-4 h-4 mr-1 inline" /> Dasar Hukum
                </Badge>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Landasan Hukum</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik</li>
                    <li>Peraturan Kapolri Nomor 14 Tahun 2011 tentang Pedoman Pengelolaan Informasi dan Dokumentasi</li>
                    <li>Peraturan Komisi Informasi Pusat</li>
                </ul>
                </div>
            </article>

            {/* Kanan - Placeholder Gambar */}
            <img
                src="/logo_polda.png"
                alt="Logo Polda Sumbar"
                width={400}
                height={400}
                className="object-contain rounded-xl shadow-md"/>
            </div>
        </div>
        </section>
    )
}
