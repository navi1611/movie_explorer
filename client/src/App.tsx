import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import AppRoutes from './routes';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex h-screen bg-background-primary">
          <Sidebar />
          <div className="flex-1 p-8 fade-in overflow-auto">
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

