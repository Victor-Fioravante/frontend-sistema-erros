import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SuggestionList } from './pages/suggestionList.tsx'
import EvaluationList from './pages/evaluationList.tsx'
// import EvaluationRegister from './pages/evaluationRegister.tsx'
import SuggestionRegister from './pages/suggestionRegister.tsx';
import { MenuBar } from './index.ts';
import DarkModeToggle from './components/darkMode-button/darkMode-button.tsx';

function App() {
  return (
    <Router>
      <DarkModeToggle />
      <MenuBar />
      <Routes>
        <Route path="/sugestao" element={<SuggestionList />} />
        <Route path="/cadastrar-sugestao" element={<SuggestionRegister />} />
        <Route path="/avaliacao" element={<EvaluationList />} />
        {/* <Route path="/cadastrar-avaliacao" element={<EvaluationRegister />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)

