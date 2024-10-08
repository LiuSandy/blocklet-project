import { useState } from 'react';
import { Button } from 'antd';
import reactLogo from '../assets/react.svg';
import blockletLogo from '../assets/blocklet.svg';
import viteLogo from '../assets/vite.svg';
import './home.css';

function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
          <img src={blockletLogo} className="logo blocklet" alt="Blocklet logo" />
        </a>
      </div>
      <h1>Vite + React + Blocklet</h1>
      <div className="card">
        <Button type="primary" onClick={() => setCount((currentCount) => currentCount + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default Home;
