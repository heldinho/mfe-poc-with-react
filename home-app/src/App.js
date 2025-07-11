import React, { lazy, Suspense } from "react"; // Must be imported for webpack to work
import "./App.css";

const Header = lazy(() =>
  import("HeaderApp/Header").catch((error) => {
    console.error("Falha ao carregar componente remoto:", error);
    return { default: () => <div>Componente indisponível</div> };
  }),
);

const Modal = lazy(() =>
  import("ModalApp/Modal").catch((error) => {
    console.error("Falha ao carregar componente remoto:", error);
    return { default: () => <div>Componente indisponível</div> };
  }),
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading Modal...</div>}>
        <Modal />
      </Suspense>
      <div className="container">Demo home page</div>
    </div>
  );
}

export default App;
