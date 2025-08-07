// src/components/ui/LandingPage.tsx
import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

import Hero from "./Hero"
import News from "./News"
import Services from "./Services"
import InformationCategories from "./InformationCategories"
import RequestForm from "./RequestForm"
import Contact from "./Contact"
import LoginForm from "./LoginForm"
import AboutPPID from "./AboutPPID"
// import Header from "./Header"
// import Footer from "./Footer"

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-white">
        <div>
          <Hero />
        </div>

        <div data-aos="fade-up">
          <AboutPPID />
        </div>

        <div data-aos="fade-up">
          <Services />
        </div>

        <div data-aos="fade-up">
          <InformationCategories />
        </div>

        <div data-aos="fade-up">
          <RequestForm />
        </div>

        <div data-aos="fade-up">
          <News />
        </div>

        <div data-aos="fade-up">
          <Contact />
        </div>
      </div>
      {/* <Footer /> */}

      {isLoginOpen && <LoginForm onClose={() => setIsLoginOpen(false)} />}
    </>
  )
}
