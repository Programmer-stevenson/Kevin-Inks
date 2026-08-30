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

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Designs />
        <Experience />
        
        <EmailList />
        <FinalCta />
        <Studio/>
      </main>
      <Footer />
    </>
  )
}