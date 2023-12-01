import React from 'react';
import { useState } from 'react';
import './App.css';
import analyzeImage, { isConfigured } from './azure-image-analysis';
import generateImage, { isConfiguredOpenIa } from './openAI-image-generation';
// import react-dom
import ReactDOM from 'react-dom';

// Create function app to render a title and form input with two buttons
function App() {
  const [inputAnalyze, setInputAnalyze] = useState('');
  const resultDiv = document.getElementById('result');
  let titleResponse = '';

  const isConfiguredImageAnalysis = isConfigured();
  const isConfiguredImageGeneration = isConfiguredOpenIa();

  if (!isConfiguredImageAnalysis || !isConfiguredImageGeneration) {
    return (
      <div className="App">
        <p>Key and/or endpoint not configured for cognitive services.</p>
      </div>
    );
  }

  function LoadingPage(props) {
    if (props.loading) {
      return <p>Loading...</p>;
    }
  }

  function AnalyzeClick() {
    console.log('Click happened');
    // render loadingPage function
    ReactDOM.render(
      LoadingPage({loading: true}),
      resultDiv
    );

    // call function analyzeImage and print response in console
    analyzeImage(inputAnalyze).then(response => {
      // convert response to json
      // console.log(JSON.stringify(response));
      titleResponse = "Computer Vision Analysis";
      ReactDOM.render(
        DisplayResults({response: response, url: inputAnalyze}),
        resultDiv
      );
    }, error => {
      console.error(error);
      ReactDOM.render(
        <>
          <p>Ocurrió un error inesperado: {error.message}</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>,
        resultDiv
      );
    });
  }

  function GenerateClick() {
    console.log('Click happened');
    // render loadingPage function
    ReactDOM.render(
      LoadingPage({loading: true}),
      resultDiv
    );

    // call function generateImage and print response in console
    generateImage(inputAnalyze).then(response => {
      // convert response to json
      // console.log(JSON.stringify(response));
      titleResponse = "Image Generation";
      ReactDOM.render(
        DisplayResults({response: response, url: response.data[0].url}),
        resultDiv
      );
    }, error => {
      console.error(error);
      ReactDOM.render(
        <>
          <p>Ocurrió un error inesperado: {error.message}</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>,
        resultDiv
      );
    });
  }

  function DisplayResults(props) {
    if (props.response) {
      return (
        <>
          <hr/>
          <h2>{titleResponse}</h2>
          <img src={props.url} alt="pic analyzed" width="400" height="auto" />
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
      <input name="inputAnalyze" id="inputAnalyze" value={inputAnalyze} 
        type="text" placeholder="Enter URL to analyze or textual prompt to generate an image" 
        onChange={e => setInputAnalyze(e.target.value)}/>
      <br></br>
      <button className="btnAnalyze" onClick={AnalyzeClick}>Analyze</button>
      <button className="btnGenerate" onClick={GenerateClick}>Generate</button>
      <div id="result"></div>
    </div>
  );

};




export default App;
