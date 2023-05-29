import React, { Component } from "react";
import TutorialDataService from "../services/train.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

    
    // // this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      name: "",
      to: "", 
      from: "", 
      time: Date.now(),
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  
  onChangeTo(e) {
    this.setState({
      to: e.target.value
    });
  }

  onChangeFrom(e) {
    this.setState({
      from: e.target.value
    });
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value
    });
  }

  // onChangeDescription(e) {
  //   this.setState({
  //     description: e.target.value
  //   });
  // }

  saveTutorial() {
    var data = {
      name: this.state.name,
      from: this.state.from,
      to: this.state.to,
      time: this.state.time,
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          name: '',
          from: '',
          to: '',
          time: '',
        });
        alert(`Creating done: ${JSON.stringify(response.data)}`);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      name: '',
      from: "",
      to: "",
      time: Date.now(),
    });
  }

  render() {
    return (
      <div className="submit-form">
       
          <div>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>


            <div className="form-group">
              <label htmlFor="from">From</label>
              <input
                type="text"
                className="form-control"
                id="from"
                required
                value={this.state.from}
                onChange={this.onChangeFrom}
                name="from"
              />
            </div>

            <div className="form-group">
              <label htmlFor="to">To</label>
              <input
                type="text"
                className="form-control"
                id="to"
                required
                value={this.state.to}
                onChange={this.onChangeTo}
                name="to"
              />
            </div>


            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                value={this.state.time}
                onChange={this.onChangeTime}
                name="date"
              />
            </div>


            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        
      </div>
    );
  }
}
