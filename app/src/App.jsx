import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Github from './pages/Github'
import Layout from './pages/Layout';

// React component
function App() {
  // BrowserRouter is not well supported in packaged Electron apps, therfore "HashRouter"
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="github" element={<Github />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
