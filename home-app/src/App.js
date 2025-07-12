import React, { lazy, Suspense, memo, use } from 'react';
import './App.css';

// Fallbacks como componentes memoizados
const HeaderFallback = memo(() => <div>Loading Header...</div>);
const ModalFallback = memo(() => <div>Loading Modal...</div>);
const ErrorFallback = memo(() => <div>Componente indisponível</div>);

const zustandApp = React.lazy(() =>
  import('ZustandApp/useCounterStore').catch(() => ({
    default: null,
  })),
);

// Lazy loading com tratamento de erro otimizado
const Header = lazy(() =>
  import('HeaderApp/Header').catch(() => ({
    default: ErrorFallback,
  })),
);

const Modal = lazy(() =>
  import('ModalApp/Modal').catch(() => ({
    default: ErrorFallback,
  })),
);

// Componentes otimizados com memo
const MemoizedHeader = memo(() => (
  <Suspense fallback={<HeaderFallback />}>
    <Header />
  </Suspense>
));

const MemoizedModal = memo(() => (
  <Suspense fallback={<ModalFallback />}>
    <Modal />
  </Suspense>
));

const App = () => {
  const { count, increment, decrement, reset } = zustandApp();

  return (
    <div className="App">
      <MemoizedHeader />
      <MemoizedModal />
      <div className="container">Demo home page</div>
      <button onClick={increment}>Count: {count}</button>
    </div>
  );
};

export default App;
