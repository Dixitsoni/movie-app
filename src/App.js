import { Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layout';
import MovieDetail from './layout/movieSection/movieDetail/MovieDetail';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<DefaultLayout />} />
        <Route path='/movie-detail/:id' element={<MovieDetail />} />
      </Routes>
    </>

  );
}

export default App;
