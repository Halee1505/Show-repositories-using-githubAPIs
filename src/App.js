import './App.css';
import Nvbar from './components/layout/navBar';
import State from './state/State';

function App() {
  return (
    <div className="App">
      <State>
        <Nvbar />

      </State>
    </div>
  );
}

export default App;
// Xử lý input liên tục không nhận kq
// test lại
// deploy