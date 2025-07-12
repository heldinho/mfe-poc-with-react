import React from 'react';
import './App.css';
import { useRemoteStoreValue } from './hooks/useRemoteStoreValue';

export default function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const count = useRemoteStoreValue(
    () => import('ZustandApp/store'),
    state => state.count,
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="modalApp">
      <div>Modal App - Contador remoto: {count ?? '...'}</div>

      <button onClick={openModal} className="open-modal-btn">
        Abrir Modal
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Título do Modal</h2>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Este é o conteúdo do modal.</p>
              <br />
              <div>Valor atual do contador: {count}</div>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} className="cancel-btn">
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Ação confirmada!');
                  closeModal();
                }}
                className="confirm-btn"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
