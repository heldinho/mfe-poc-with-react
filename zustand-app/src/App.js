import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="zustandApp">
      <div>Modal App</div>

      {/* Botão para abrir o modal */}
      <button onClick={openModal} className="open-modal-btn">
        Abrir Modal
      </button>

      {/* Modal */}
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
              <p>
                Este é o conteúdo do modal. Você pode adicionar qualquer
                conteúdo aqui.
              </p>
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

export default App;
