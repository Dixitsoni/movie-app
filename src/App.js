import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layout';
import MovieDetail from './layout/movieSection/movieDetail/MovieDetail';

function App() {
  return (
    <>
      <DefaultLayout />
      {/* <HashRouter> */}
      {/* <Routes> */}
      {/* <Route exact path='/movie-app/' element={<DefaultLayout />} /> */}
      {/* <Route path='/movie-detail/:id' element={<MovieDetail />} /> */}
      {/* </Routes> */}
      {/* </HashRouter> */}
    </>

  );
}

export default App;
