import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import BlogsIndex from './pages/blogs';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import BlogDetails from './pages/blogs/show';

function App() {
  return (
    <div className="App">
      <div className='container-xxl'>
        <Navbar />
        <Routes>
          <Route path="/" element={<BlogsIndex />}/>
          <Route path="/blogs/:id" element={<BlogDetails />}/>
        </Routes>
      </div>
      {/* <Counter /> */}
    </div>
  );
}

export default App;
