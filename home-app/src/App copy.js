import React, { lazy, Suspense, memo } from 'react';
import './App.css';

// Lazy loading com tratamento de erro
const Header = lazy(() =>
  import('HeaderApp/Header').catch(error => {
    console.error('Falha ao carregar componente remoto:', error);
    return { default: () => <div>Componente indisponível</div> };
  }),
);

const Modal = lazy(() =>
  import('ModalApp/Modal').catch(error => {
    console.error('Falha ao carregar componente remoto:', error);
    return { default: () => <div>Componente indisponível</div> };
  }),
);

// Componente Header com memo
const MemoizedHeader = memo(() => (
  <Suspense fallback={<div>Loading Header...</div>}>
    <Header />
  </Suspense>
));

// Componente Modal com memo
const MemoizedModal = memo(() => (
  <Suspense fallback={<div>Loading Modal...</div>}>
    <Modal />
  </Suspense>
));

// Componente principal com memo
const App = memo(() => {
  return (
    <div className="App">
      <MemoizedHeader />
      <MemoizedModal />
      <div className="container">Demo home page</div>
    </div>
  );
});

export default App;
