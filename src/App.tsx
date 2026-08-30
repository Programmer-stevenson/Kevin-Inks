import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Work } from './components/Work'
import { Designs } from './components/Designs'
import { Experience } from './components/Experience'
import { About } from './components/About'
import { EmailList } from './components/EmailList'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Studio } from './components/Studio'
import { FloatingTextCta } from './components/FloatingTextCta'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Designs />
        
        <Studio/>
        <EmailList />
        
        <FinalCta />
        <FloatingTextCta />
      </main>
      <Footer />
    </>
  )
}