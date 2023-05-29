import React, { Component } from "react";
import TutorialDataService from "../services/train.service";
import { withRouter } from '../common/with-router';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        name: "",
        from: "",
        to: "",
        time: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          name: name
        }
      };
    });
  }

  onChangeTo(e) {
    const to = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        to: to
      }
    }));
  }
  
  onChangeTime(e) {
    const time = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        time: time
      }
    }));
  }
  onChangeFrom(e) {
    const from = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        from: from
      }
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      name: this.state.currentTutorial.name,
      to: this.state.currentTutorial.to,
      from: this.state.currentTutorial.from,
      date: this.state.currentTutorial.time
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The train was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/trains');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Railway timetable</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentTutorial.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="to">To</label>
                <input
                  type="text"
                  className="form-control"
                  id="to"
                  value={currentTutorial.to}
                  onChange={this.onChangeTo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="from">From</label>
                <input
                  type="text"
                  className="form-control"
                  id="from"
                  value={currentTutorial.from}
                  onChange={this.onChangeFrom}
                />
              </div>


              <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                value={currentTutorial.time}
                onChange={this.onChangeTime}
                name="date"
              />
            </div>
             
            </form>

           
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Railway timetable...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Tutorial);