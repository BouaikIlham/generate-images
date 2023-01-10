import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect} from 'react'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import './App.css';


function App() {
  const [prompt, setPrompt] = useState();
  const [image, setimage] = useState();
  const [theme, setTheme] = useState("light")
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")

    }

  }, [theme])

  const hnadleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateImages = async () => {
    setIsLoading(true)
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setimage(response.data.data[0].url)
    setIsLoading(false)
  }
  return (
    <div> 
      {isLoading ? <div className="h-screen bg-orange-100 flex items-center justify-center dark:bg-slate-800"><ClimbingBoxLoader /></div>
      :
        <div>
          <div className="flex justify-end bg-orange-100 dark:bg-slate-800">
            <button className="
              w-12 
              h-6 
              rounded-full 
              p-1 
              bg-gray-400 
              dark:bg-gray-600 
              relative 
              transition-colors 
              duration-500 
              ease-in
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-700 
              dark:focus:ring-blue-600 
              focus:border-transparent
              mr-4 mt-2" onClick={() => hnadleThemeSwitch()}>
                  <div
                    class="rounded-full 
                            w-4 
                            h-4 
                            bg-blue-600 
                            dark:bg-blue-500 
                            relative 
                            ml-0 
                            dark:ml-6 
                            pointer-events-none 
                            transition-all 
                            duration-300 
                            ease-out">
                  </div>
            </button>
          </div>
          <header className="bg-orange-100 dark:bg-slate-800 h-screen flex flex-col	items-center ">
            <div className="mt-12">
              <h1 className="sm:font-mono text-2xl font-semibold text-center dark:text-white	">Generate Images With OpenAI Api</h1>
            </div>
            <div className="mt-12">
              <input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cat with a hat" onChange={(e) => setPrompt(e.target.value)}></input>
            </div>
            <div className="mt-12">
              <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={(generateImages)}>Generate</button>
            </div>
            <div>
              <img className="rounded-full w-96 h-96" alt="" src={image} />
            </div>
        
          </header>
        </div>
        
      }
     
    </div>
  );

}

export default App;
