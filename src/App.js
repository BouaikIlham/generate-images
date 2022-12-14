import { Configuration, OpenAIApi } from "openai";
import './App.css';


function App() {
  console.log(process.env.REACT_APP_OPENAI_API_KEY)
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
    </div>
  );
}

export default App;
