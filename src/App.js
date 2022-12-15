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
    <div className="mx-8">
      <header className="border-x-4 border-indigo-500 my-2 m-8">
        <div className="flex justify-center text-black-900 uppercase font-black">
          <h1 className="text-2xl ">Generate Images</h1>
        </div>
        <div className="flex justify-center"> 
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-underline mt-8" placeholder="Cat with a hat" onChange={(e) => setPrompt(e.target.value)}></input>
        </div>
        <div className="flex justify-center">
          <button className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" onClick={generateImages}>Generate</button>
        </div>
        <div className="flex flex-wrap justify-center">
          <img className="max-w-sm h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl mt-8 rounded-full" alt="" src={image} /> 
        </div>
      </header>
    </div>
  );
}

export default App;
