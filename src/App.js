import { Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layout';
import MovieDetail from './layout/movieSection/movieDetail/MovieDetail';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename='/movie-app'>
      <Routes >
        <Route exact path='/movie-app' element={<DefaultLayout />} />
        <Route path='/movie-detail/:id' element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
