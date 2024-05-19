import { ReactMediaRecorder } from "react-media-recorder";
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import Tarjetas from "./Tarjetas";


const RecordView = () => (
  <div>
    <ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div className="mobile">
          <p className="fact">Fact checker</p>
          <p>{status}</p>
          <button className="start" onClick={startRecording}>
          <p className="testart">Start <br/> Recording</p>
          </button>
          <button className="stop" onClick={stopRecording}>
            <p className="testop">Stop Recording</p>
          </button>
          <audio className="mini" src={mediaBlobUrl} controls autoPlay />
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <input type="file" id="fileInput" style={{display: 'none'}}  />
<button className="stop" onClick={() => document.getElementById('fileInput').click()}>
  <FontAwesomeIcon icon={faPaperclip} /> 
  &nbsp; <p className="testop">Elegir archivo</p>
</button>
          <br/>
          <br/>
          <br/>
        <Tarjetas/> 
        </div>
      )}
    />
  </div>
);

export default RecordView;