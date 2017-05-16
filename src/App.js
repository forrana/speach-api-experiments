import React, {
    Component
} from 'react';
import logo from './logo.svg';
import './App.css';


let recognition,
    resultString = '';



class App extends Component {
    constructor() {
      super();

      this.state = {
        resultString: '',
        recognition: {},
      }

      if (!('webkitSpeechRecognition' in window)) {
          //  upgrade();
      } else {
          this.state.recognition = new window.webkitSpeechRecognition();

          this.state.recognition.continuous = true;
          this.state.recognition.interimResults = true;
          this.state.recognition.onstart = function() { console.log('started') }
          this.state.recognition.onresult =
            (event) => {
              [...event.results].forEach(
                result => {
                  [...result].forEach(
                    variant => {
                      console.log(variant.transcript, variant.confidence);
                      this.setState({resultString: variant.transcript});
                    }
                  )
                }
              )
            }
          this.state.recognition.onerror = function(event) {}
          this.state.recognition.onend = function() {}
      }
    }
    render() {
      console.log(this.state.resultString);
        return (
          <div>
          <button className="square" onClick={() => this.state.recognition.start()}>
            Start
          </button>
            { this.state.resultString }
          </div>
        );
    }
}

export default App;
