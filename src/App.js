import { Configuration, OpenAIApi } from "openai";
import {useState} from 'react'
import './App.css';


function App() {
  // console.log(process.env.REACT_APP_OPENAI_API_KEY)
  const [prompt, setPrompt] = useState();
  const [image, setimage] = useState();

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateImages = async () => {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setimage(response.data.data[0].url)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Generate Images</h2>
        <input onChange={(e) => setPrompt(e.target.value)}></input>
        <button onClick={generateImages}>Generate an image</button>
        <img alt="" src={image} /> 
      </header>
    </div>
  );
}

export default App;
