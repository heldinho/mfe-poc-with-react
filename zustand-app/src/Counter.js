// app-counter/src/Counter.tsx
import React from 'react';
import useStore from './store';

export default function Counter() {
  const { count, increment } = useStore();

  return (
    <div>
      <h2>Contador Remoto: {count}</h2>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}
