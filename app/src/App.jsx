import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home';

// React component
function App() {
  // BrowserRouter is not well supported in packaged Electron apps, therfore "HashRouter"
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
