import React from 'react';
import { useState } from 'react';
import './App.css';
import ImageAnalysisAzure from './azure-image-analysis';
import ImageGenerationOpenAI from './openAI-image-generation';
import ReactDOM from 'react-dom';

function App() {
  const [inputAnalyzeGenerate, setInputAnalyzeGenerate] = useState('');
  const resultDiv = document.getElementById('result');
  let titleResponse = '';

  // Ensure that the keys and endpoints are configured
  if (!ImageAnalysisAzure.isConfigured() || !ImageGenerationOpenAI.isConfigured()) {
    return (
      <div className="App">
        <p>Key and/or endpoint not configured for cognitive services.</p>
      </div>
    );
  }

  // Loading page
  function LoadingPage(props) {
    if (props.loading) {
      return <p>Loading...</p>;
    }
  }

  // Analyze URL image from Azure with Image Analysis API 4.0
  function AnalyzeClick() {
    console.log('Click happened');
    // render loadingPage function
    ReactDOM.render(
      LoadingPage({loading: true}),
      resultDiv
    );

    // call function analyzeImage and print response
    ImageAnalysisAzure.analyzeImage(inputAnalyzeGenerate).then(response => {
      titleResponse = "Computer Vision Analysis";

      // render DisplayResults function
      ReactDOM.render(
        DisplayResults({response: response, url: inputAnalyzeGenerate}),
        resultDiv
      );
    }, error => {
      console.error(error);
      ReactDOM.render(
        <>
          <p>Ocurrió un error inesperado: {error.message}</p>
          <pre>{JSON.stringify(error.response, null, 2)}</pre>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>,
        resultDiv
      );
    });
  }

  // Generate image from OpenAI with DALL-E send prompt text
  function GenerateClick() {
    console.log('Click happened');
    // render loadingPage function
    ReactDOM.render(
      LoadingPage({loading: true}),
      resultDiv
    );

    // call function generateImage and print response
    ImageGenerationOpenAI.generateImage(inputAnalyzeGenerate).then(response => {
      titleResponse = "Image Generation";

      // render DisplayResults function
      ReactDOM.render(
        DisplayResults({response: response, url: response.data[0].url}),
        resultDiv
      );
    }, error => {
      console.error(error);
      ReactDOM.render(
        <>
          <p>Ocurrió un error inesperado: {error.message}</p>
          <pre>{JSON.stringify(error.response, null, 2)}</pre>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>,
        resultDiv
      );
    });
  }

  // Display results
  function DisplayResults(props) {
    if (props.response) {
      return (
        <>
          <hr/>
          <h2>{titleResponse}</h2>
          <img src={props.url} alt="pic analyzed or generated" width="400" height="auto" />
          <p>URL: {props.url}</p>
          <pre
          style={{
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
          >
            {JSON.stringify(props.response, null, 2)}
          </pre>
        </>
      );
    }
  }

  return (
    <div className="App">
      <h1>Computer vision</h1>
      <label>Insert URL or type prompt: </label>
      <br></br>
      <input name="inputAnalyze" id="inputAnalyze" value={inputAnalyzeGenerate} 
        type="text" placeholder="Enter URL to analyze or textual prompt to generate an image" 
        onChange={e => setInputAnalyzeGenerate(e.target.value)}/>
      <br></br>
      <button className="btnAnalyze" onClick={AnalyzeClick}>Analyze</button>
      <button className="btnGenerate" onClick={GenerateClick}>Generate</button>
      <div id="result"></div>
    </div>
  );

};

export default App;
