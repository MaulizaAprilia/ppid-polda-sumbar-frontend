// src/components/ui/LandingPage.tsx
import { useState } from "react"
import Hero from "./Hero"
import News from "./News"
import Services from "./Services"
import InformationCategories from "./InformationCategories"
import RequestForm from "./RequestForm"
import Contact from "./Contact"
import LoginForm from "./LoginForm"
import AboutPPID from "./AboutPPID"
// import Header from "./Header"     // ✅ tambahkan ini
// import Footer from "./Footer"     // ✅ tambahkan ini

export default function LandingPage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    return (
        <>
        {/* <Header /> */}
        <div className="min-h-screen bg-white">
            <Hero />
            <AboutPPID />
            <Services />
            <InformationCategories />
            <RequestForm />
            <News />
            <Contact />
        </div>
        {/* <Footer /> */}
        {isLoginOpen && <LoginForm onClose={() => setIsLoginOpen(false)} />}
        </>
    )
}