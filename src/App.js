import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, TextArea, Button, Container, Loader} from 'semantic-ui-react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [inputLength, setInputLength] = useState('');
  const [inputTheme, setInputTheme] = useState('');
  const [resultText, setResultText] = useState('');
  const [isSynopsis, setIsSynopsis] = useState(true);
  const [sliderValue, setSliderValue] = useState('0.5');
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const prompt1 = `Keywords: ${inputText}\nWrite a harmless synopsis for an interesting ${inputLength} long ${inputTheme} film that includes all of the keywords.\nSynopsis:\n`
  const prompt2 = `Keywords: ${inputText}\nWrite a short excerpt from an interesting ${inputLength} long ${inputTheme} film with a plot that incorporates all of the keywords. Present the excerpt in proper script format.\nExcerpt:\n`

  const getOpenAIResponse = () => {
    setIsLoading(true);
    axios.get('http://localhost:8000', {
      params: {
        model: "text-davinci-002",
        prompt: `${isSynopsis ? prompt1 : prompt2}`,
        max_tokens: 256,
        sliderValue: sliderValue
      }
    })
    .then((res) => {
      {isSynopsis ? setResultText(res.data.replace(/\n/g, '')) : setResultText(res.data)}
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (isMounted.current) {
      console.log("this is useEffect:", isSynopsis);
      getOpenAIResponse();
    } else {
      isMounted.current = true;
    }
  }, [isSynopsis])

  const setMode = (e) => {
    if (e.target.value === 'synopsis') {
      setIsSynopsis(true);
      if (isSynopsis) getOpenAIResponse();
    } else {
      setIsSynopsis(false);
      if (!isSynopsis) getOpenAIResponse();
    }
  }

  return (
    <Container className='container' textAlign='center'>
      <div className="app-header">
        <h2 className="header">Movie Plot Generator</h2>
      </div>
      <div className='app-body'>
            <Form>
              <h3>List any number of keywords you want in your film synopsis or script excerpt. Ex: man, woman, dog, McDonald's</h3>
                <Form.Field control={TextArea} placeholder="Enter keywords for your synopsis..." onChange={(e) => setInputText(e.target.value)}/>

                <h3>Choose length of film.</h3>
                <select onChange={(e) => setInputLength(e.target.value)}>
                    <option>10 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                </select>

                <h3>Choose genre of film.</h3>
                <select onChange={(e) => setInputTheme(e.target.value)}>
                    <option>Drama</option>
                    <option>Comedy</option>
                    <option>Action</option>
                    <option>Science fiction</option>
                    <option>Adventure</option>
                </select>

                <h3>Choose whether you want your story to be more predictable or more random.</h3>
                <div className="slidecontainer">
                  <span>More Predictable</span>
                  <input className="slider" onChange={(e) => setSliderValue(e.currentTarget.value)} type="range" min="0" max="1.0" step='0.01' value={sliderValue}/>
                  <span>More Random</span>
                </div>

                <Button size='large' value='synopsis' onClick={setMode}>
                  Make a synopsis!
                </Button>

                <Button size='large' value='excerpt' onClick={setMode}>
                  Make an excerpt!
                </Button>

                <h2>{isSynopsis ? 'Synopsis:' : 'Excerpt:'}</h2>

                {isLoading ? (
                  <Loader active inline='centered'>Loading</Loader>
                ) : (
                  <textarea readOnly='readonly' value={resultText} rows='25'/>
                )}
            </Form>
        </div>
    </Container>
  );
}

export default App;
