import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import API from "../../utils/API.js";
import { Header, CauseButtons, EventCard, Controls, FeaturedEvents } from "../../components/home";
import tempFeatured from "./tempFeaturedEvents.json";

class Home extends Component {

  state = {
    error: null,
    isLoaded: false,
    events: [],
    causes: [],
    featured: tempFeatured,
  };

  // After componenet mounts, makes API call to query for all events and causes. Once received, updates state and loads child components.
  componentDidMount() {
    console.log("*****COMPONENT DID MOUNT FOR HOME PAGE CALLED*****");
    let promises = [API.getAllEvents(), API.getCauses()];
    Promise.all(promises)
      .then((values) => {
        console.log(values);
        this.setState({
          isLoaded: true,
          events: values[0].data,
          causes: values[1].data
        })
      }, (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
  };

  // Querys database for all events by cause and updates state with returned events.
  handleCauseButtonClick = (event) => {
    const causeId = event.target.getAttribute("causeid");    
    return (
      API.getEventsByCause(causeId).then((events) => {
        console.log(events.data);
        this.setState({
          events: events.data
        })
      }, (error) => {
        this.setState({
          error
        });
      })
    )
  };

  // For now just alerts event button data, will implement logic to join event.
  // Will need to conditionally display join button if user logged in, obtain userID through auth.
  // Is join needed here? Or should we only have it on the single event page?
  handleJoinEventButtonClick(event) {
    alert(`Event: ${event.target.getAttribute("eventTitle")} \nEvent ID: ${event.target.getAttribute("eventId")}`);
  };

  sortByDate = () => {
    // setState to Events sorted by date, need to discuss perameters for this..
  }

  sortByLocation = () => {
    // setState to sort by location, by city? proximity?
  }

  // Runs get request obtain all events, sets state.events to all events.
  displayAllEvents() {
    API.getAllEvents()
      .then((events) => {
        this.setState({
          events: events.data
        })
      }, (error) => {
        this.setState({
          error
        });
      })
  }

  myEvents() {
    // setState to hold events user is attending or has organized.
    // Need to discuss how to handle this..
  }

  render() {
    const { error, isLoaded, events, indicators, controls, causes, featured } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Header/>
          <CauseButtons
            causes={causes}
            handleCauseButtonClick={this.handleCauseButtonClick}
          />
          <Row>

            {/* Events container */}
            <Col md={6}>
              <div>
                {events.map((event) => {
                  return (
                    <EventCard
                      key = {event._id}
                      data = {event}
                      handleJoinEventButtonClick = {this.handleJoinEventButtonClick}
                      userId = {this.props.authData.user_id}
                    />
                  )
                })}
              </div>
            </Col>

            {/* Controls container */}
            <Col md={2}>
              <Controls
                sortByDate = {this.sortByDate}
                sortByLocation = {this.sortByLocation}
                displayAllEvents = {this.displayAllEvents}
                myEvents = {this.myEvents}
              />
            </Col>

            {/* Featured Events container */}
            <Col md={4}>
              <FeaturedEvents
                data = {featured}
              />
            </Col>

          </Row>
        </div>

      );
    }
  }
}

export default Home;
