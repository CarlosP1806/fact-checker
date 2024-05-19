import { ReactMediaRecorder } from "react-media-recorder";
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import Tarjetas from "./Tarjetas";
import { useState } from "react";

const RecordView = () => {
  const [file, setFile] = useState(null);
  const [cards, setCards] = useState(null);
  const [cardsLoading, setCardsLoading] = useState(false);
  console.log(file);

  const onSubmitAudio = async () => {
    setCardsLoading(true);
    const formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]);

    const response = await fetch('http://localhost:3001/api/fact-check', 
    {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    setCards(data);
    setCardsLoading(false);

    console.log(data);
  }

  const onSubmitRecord = async (mediaBlobUrl) => {
    setCardsLoading(true);

    const audio = await fetch(mediaBlobUrl);
    const blob = await audio.blob();

    const formData = new FormData();
    formData.append('file', blob, "audio.wav");

    const response = await fetch('http://localhost:3001/api/fact-check', 
    {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    setCards(data);
    setCardsLoading(false);

    console.log(data);
  }
  
  return (
    <div>
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div className="mobile">
            <p className="fact">Fact checker</p>
            <p className="estado">{status}</p>
            <button className="start" onClick={startRecording}>
            <p className="testart">Empezar a <br/> grabar</p>
            </button>
            <button className="stop" onClick={stopRecording}>
              <p className="testop">Parar de grabar</p>
            </button>
            <audio className="mini" src={mediaBlobUrl} controls autoPlay />
            <button className="submit" onClick={() => onSubmitRecord(mediaBlobUrl)}>Subir grabación</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <input type="file" id="fileInput" style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])} />
  <button className="elegir" onClick={() => document.getElementById('fileInput').click()}>
    <FontAwesomeIcon icon={faPaperclip} /> 
    &nbsp; <p className="testop">Elegir archivo</p>
  </button>
  <button className="subar" onClick={onSubmitAudio}>
    Subir archivo
  </button>
            <br/>
            <br/>
            <br/>
          <Tarjetas data={cards} isLoading={cardsLoading}/> 
          </div>
        )}
      />
    </div>
)};

export default RecordView;