// src/pages/HomePage.tsx
import Hero from '../sections/homepage/Hero'
import NotesSection from '../components/notes/NotesSection'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <div className="relative z-10 bg-white">
        <NotesSection />
      </div>
    </div>
  )
}

export default Homepage