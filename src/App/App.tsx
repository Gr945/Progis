import './App.css';
import MapComponent from '../MapComponent/MapComponents';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./logoProgis.png" alt="Logo Progis" style={{ height: '100px', width: '100px' }} />
        Test Progis
      </header>
      <MapComponent />
    </div>
  );
}

export default App;
