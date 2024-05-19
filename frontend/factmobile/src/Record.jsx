import { ReactMediaRecorder } from "react-media-recorder";
import './Style.css';

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
        </div>
      )}
    />
  </div>
);

export default RecordView;