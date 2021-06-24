import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <form>
            <label>
              L O G I N :
              <pre>
                Email :
                <input type="text" name="name" />
              </pre>
              <pre>
                Name :
                <input type="text" name="name" />
              </pre>
              <pre>
                FirstName :
                <input type="text" name="name" />
              </pre>
              <pre>
                Password :
                <input type="text" name="name" />
              </pre>
            </label>
            <input type="submit" value="Send" />
          </form>
          <pre>
          Already registered?
          </pre>
          <form>
            <label>
              L O G I N :
              <pre>
                Email :
                <input type="text" name="name" />
              </pre>
              <pre>
                Password :
                <input type="text" name="name" />
              </pre>
            </label>
            <input type="submit" value="Send" />
          </form>
        </p>
        <a
          className="App-link"
          href="https://intra.epitech.eu/module/2020/B-WEB-200/PAR-2-1/acti-445477/project/file/B-WEB-200_Epytodo.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Epytodo subject
        </a>
      </header>
    </div>
  );
}

export default App;
