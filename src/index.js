import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChangeLog from './components/changelog/ChangeLog';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import About from './components/about/about';

ReactDOM.render(
  <React.StrictMode>
    <Router>

    <div className='p-0 m-0 bg-white dark:bg-gray-900'>
          <Navbar />
      <Routes>
        <Route path='*' element={<App />} />
        <Route path='/ChangeLog' element={<ChangeLog />} />
        <Route path='/About' element={<About />} />

      </Routes>
      <div className='w-full flex lg:flex-row flex-col items-stretch justify-center content-center space-y-4 space-x-0 lg:space-y-0 lg:space-x-4 p-4'>
<div id="125770478">
  <script type="text/javascript"> try { window._mNHandle.queue.push(function (){ window._mNDetails.loadTag("125770478", "728x90", "125770478"); }); } catch (error) {}
  </script>
</div>
        </div>

      <div className='w-full flex lg:flex-row flex-col items-stretch justify-center content-center space-y-4 space-x-0 lg:space-y-0 lg:space-x-4 p-4'>
            <Footer />
          </div>
      </div>

    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
