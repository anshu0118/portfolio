import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import ColorBends from './components/ColorBends';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <Hero />

        <div className="relative">
          <div className="color-bends-layer pointer-events-none sticky top-0 z-0 h-screen w-full overflow-hidden">
            <ColorBends
              colors={['#3B1B8F', '#5227FF', '#6F63B5']}
              rotation={90}
              speed={0.2}
              scale={0.85}
              frequency={1.05}
              warpStrength={1}
              mouseInfluence={0.75}
              noise={0}
              parallax={0.45}
              iterations={0.9}
              intensity={1}
              bandWidth={6}
              transparent={true}
              autoRotate={2}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.22)_100%)]" />
          </div>

          <div className="relative z-10 -mt-[100vh]">
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
