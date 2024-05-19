import { ReactMediaRecorder } from "react-media-recorder";
import './Style.css';
import bueno from './images/check.png'
import malo from './images/delete.png'
import neutro from './images/neutro.png'
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
          <button className="stop" onClick={stopRecording}>Stop Recording</button>
          <audio src={mediaBlobUrl} controls autoPlay />
          <br/>
          <br/>
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
      )}
    />
  </div>
);

export default RecordView;