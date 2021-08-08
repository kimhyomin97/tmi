import logo from '../logo.svg';
import './App.css';
import HomePage from './views/HomePage/HomePage.js';
import Header from './views/Header/Header.js';

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Project TMI
    //     </a>
    //   </header>
    // </div>

    
  );
}

export default App;
