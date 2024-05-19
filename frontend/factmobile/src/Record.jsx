import { ReactMediaRecorder } from "react-media-recorder";
import './Style.css';
import bueno from './images/check.png'
import malo from './images/delete.png'
import neutro from  './images/neutro.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';


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
          <div className="contar">
          <div className="tarjeta">
            <p className="factopeq"> Facto 1</p> 
            <img src={bueno} className="bueno" alt="bueno" />
            <p className="tirando-factos">De hecho. la pobreza en México ha disminuido el 90%</p>
          </div>
          <br/>
          <br/>
          <div className="tarjeta">
            <p className="factopeq"> Facto 2</p> 
            <img src={neutro} className="bueno" alt="neutro" />
            <p className="tirando-factos">El género es un constructo social</p>
          </div>
          <br/>
          <br/>
          <div className="tarjeta">
            <p className="factopeq"> Facto 3</p> 
            <img src={malo} className="bueno" alt="malo" />
            <p className="tirando-factos">Las mujeres no saben conducir</p>
          </div>
          </div>

        </div>
      )}
    />
  </div>
);

export default RecordView;