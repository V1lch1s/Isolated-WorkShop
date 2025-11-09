import tomatoLogo from "./assets/tomato.svg"; {/* Se usa el componente */}
import Typewriter from "./components/Typewriter";
import GetStarted from "./components/get-started";
import Footer from "./components/Footer";
import './Landing.css'
// sass
function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden">
      {/* Adornos */}
        <div
          aria-hidden="true"
          className="fixed inset-x-0
                     -left-50
                     -top-40
                     -z-0
                     transform-gpu
                     overflow-hidden
                     blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              background: "#fa8e9cff",
            }}
            className="relative left-[calc(50%-11rem)]
                       aspect-[1155/678]
                       w-[36rem] -translate-x-1/2
                       rotate-[30deg]
                       bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
                       opacity-70"
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed inset-x-0
                     -left-330
                     top-50
                     -z-0
                     transform-gpu
                     overflow-hidden
                     blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              background: "#fa8e9cff",
            }}
            className="relative left-[calc(50%-11rem)]
                       aspect-[1155/678]
                       w-[36rem] -translate-x-1/2
                       rotate-[30deg]
                       bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
                       opacity-70"
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed inset-x-0
                     -right-0
                     top-160
                     -z-0
                     transform-gpu
                     overflow-hidden
                     blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              background: "#fa8e9cff",
            }}
            className="relative left-[calc(50%+11rem)]
                       aspect-[1155/678]
                       w-[36rem] -translate-x-1/2
                       rotate-[30deg]
                       bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
                       opacity-70"
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed inset-x-0
                     -right-270
                     top-50
                     -z-0 transform-gpu
                     overflow-hidden
                     blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              background: "#fa8e9cff",
            }}
            className="relative left-[calc(50%+11rem)]
                       aspect-[1155/678]
                       w-[36rem] -translate-x-1/2
                       rotate-[30deg]
                       bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
                       opacity-70"
          />
        </div>
        
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Polígono de prueba */}
        {/*<div
          className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background: "red",
            width: "200px",
            height: "200px"
          }}
        /> */}

        {/* Contenido de la vista */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">    
          <div className="justify-center items-center text-center">
            <div className="flex justify-center">
              <img alt="" src={tomatoLogo} className="h-30 w-30"/>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              TomaTask
            </h1>

            {/* Typewriter */}
            <Typewriter
              texts = {[
                "Ordena tus Deberes",
                "Aclara el camino",
                "Mejora Continua",
                "Previene desórdenes",
                "Acelera tu progreso"
              ]}
              typingSpeed={100} // Velocidad de Escritura
              deletingSpeed={30} // Velocidad de Borrado
              pauseTime={1500} // Velocidad de Pausa
              className="mt-8
                         text-lg
                         font-medium
                         text-pretty
                         text-gray-400
                         sm:text-xl/8"
            />

            {/* Call To Action */}
            <div className="mt-10 px-0 py-20 flex items-center justify-center gap-x-6">
              <GetStarted 
                texto="Empezar ahora"
                destino="/login"
                tamaño="lg"
                variante="particles"
                mostrarAura={true}
              />
            </div>
          </div>

          <div>Content</div>

          <div className="flex flex-col items-center min-[650px]:flex-row min-[650px]:justify-center min-[650px]:items-center gap-3">
            <h2 className="text-3xl font-mono text-center tracking-tight text-balance text-white sm:text-7sm">
              Organiza tus ideas con TomaTask
            </h2>
            <img alt="Tomato Logo" src={tomatoLogo} className="hidden h-9 w-9 min-[650px]:block"/>
          </div>
          
          <div className="mt-10 px-0 py-0 flex items-center justify-center gap-x-6">
            <GetStarted 
              texto="Empezar ahora"
              destino="/login"
              tamaño="lg"
              variante="particles"
              mostrarAura={true}
            />
          </div>
        </div>
        <div className="min-h-screen flex flex-col">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Landing;