import { useState } from "react"
import { Menu, X, User } from "lucide-react"
import { Button } from "../components/ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"

interface HeaderProps {
  onLoginClick?: () => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export default function Header({ onLoginClick, isLoggedIn, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      navigate(`/?scrollTo=${sectionId}`)
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { label: "Beranda", section: "beranda" },
    { label: "Berita", section: "berita" },
    { label: "Layanan", section: "layanan" },
    { label: "Informasi Publik", section: "informasi" },
    { label: "Permohonan", section: "permohonan" },
    { label: "Kontak", section: "kontak" },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo_polda.png" alt="Logo Polri" className="h-14 w-auto" />
            <div className="leading-tight">
              <h1 className="text-lg md:text-xl font-bold text-blue-950">
                PPID POLDA SUMBAR
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Pejabat Pengelola Informasi dan Dokumentasi
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavigation(item.section)}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Admin
                </Button>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
                onClick={onLoginClick}
              >
                <User className="w-4 h-4 mr-2" />
                Login Admin
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 p-4 border-t rounded-md shadow-md bg-white">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavigation(item.section)}
                  className="text-gray-700 hover:text-blue-600 text-left font-medium transition duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t">
                {isLoggedIn ? (
                  <>
                    <Button variant="outline" size="sm" className="w-fit">
                      <User className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-fit mt-2"
                      onClick={onLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 w-fit text-white mt-2"
                    onClick={onLoginClick}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login Admin
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
