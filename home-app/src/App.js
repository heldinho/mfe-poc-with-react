import './App.css';
import React from 'react';
import { useRemoteStoreValue } from './hooks/useRemoteStoreValue';

const HeaderFallback = React.memo(() => <div>Loading Header...</div>);
const ModalFallback = React.memo(() => <div>Loading Modal...</div>);
const ErrorFallback = React.memo(() => <div>Componente indisponível</div>);

const Counter = React.lazy(() => import('ZustandApp/Counter'));

const ZustandApp = React.lazy(() =>
  import('ZustandApp/Zustand').catch(() => ({
    default: ErrorFallback,
  })),
);

const Header = React.lazy(() =>
  import('HeaderApp/Header').catch(() => ({
    default: ErrorFallback,
  })),
);

const Modal = React.lazy(() =>
  import('ModalApp/Modal').catch(() => ({
    default: ErrorFallback,
  })),
);

const MemoizedHeader = React.memo(() => (
  <React.Suspense fallback={<HeaderFallback />}>
    <Header />
  </React.Suspense>
));

const MemoizedModal = React.memo(() => (
  <React.Suspense fallback={<ModalFallback />}>
    <Modal />
  </React.Suspense>
));

export default function App() {
  const [store, setStore] = React.useState(null);

  const count = useRemoteStoreValue(
    () => import('ZustandApp/store'),
    state => state.count,
  );

  React.useEffect(() => {
    import('ZustandApp/store').then(mod => setStore(() => mod.default));
  }, []);

  return (
    <div className="App">
      <MemoizedHeader />
      <MemoizedModal />
      <ZustandApp />
      <div className="container">Demo home page</div>
      <div>Valor atual do contador: {count}...</div>
      <Counter />
    </div>
  );
}
