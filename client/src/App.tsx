import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import AppRoutes from './routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <div className="app">
            <AppRoutes />
          </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

