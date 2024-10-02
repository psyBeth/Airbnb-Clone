import {Route, Routes} from 'react-router-dom';
import './App.css';
import indexPage from './pages/indexPage';

function App() {

  return (

    <Routes>
      <Route index element={ <indexPage />} />
    </Routes>


  )
}

export default App
