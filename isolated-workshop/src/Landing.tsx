import tomatoLogo from "./assets/tomato.svg"; {/* Se usa el componente */}
import Typewriter from "./components/Typewriter";
//import { Link } from "react-router-dom"; // npm i react-router-dom
import './Landing.css'
// sass
function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Tomatask</span>
        </a>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-96 -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-289"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <img alt=""
            src={tomatoLogo}
            className="h-25
                       w-25"
          />
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Tomatask
            </h1>

            {/* Se usa el componente */}
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
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Empezar ahora
              </a>
              {/*
              <a href="#" className="text-sm/6 font-semibold text-white">
                Leer más <span aria-hidden="true">→</span>
              </a>*/}
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute
                     inset-x-0
                     top-[calc(100%-13rem)]
                     -z-10 transform-gpu
                     overflow-hidden
                     blur-3xl
                     sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)]
                       aspect-[1155/678]
                       w-96 -translate-x-1/2
                       bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
                       opacity-30
                       sm:left-[calc(50%+36rem)]
                       sm:w-289"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;