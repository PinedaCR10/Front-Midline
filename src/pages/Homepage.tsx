// src/pages/HomePage.tsx
import Hero from '../sections/homepage/Hero'
import NotesSection from '../components/notes/NotesSection'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Hero />
      <div className="relative z-10">
        <NotesSection />
      </div>
    </div>
  )
}

export default Homepage