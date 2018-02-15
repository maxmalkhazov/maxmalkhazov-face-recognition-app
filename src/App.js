import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Modal from "./components/Modal/Modal";
import FaBars from "react-icons/lib/fa/bars";

import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    },
    modes: {
      "repulse": {
        distance: 100,
        duration: 0.4
      }
    }
  }
}

const initialState = {
    input: "",
        imageUrl: "",
        box: [],
        route: "signin",
        isSignedIn: false,
        isModalOpen: false,
        user: {
            id: "",
            name: "",
            email: "",
            entries: 0,
            joined: ""   
        }
}

class App extends Component {
    constructor() {
        super()
        this.state = initialState;
    }
    
    loadUser = (data) => {
        this.setState( {user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined 
        }})
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions.map((box) => {return box.region_info.bounding_box});
        const image = document.querySelector("#inputImage");
        const width = Number(image.width);
        const height = Number(image.height);
        const box = clarifaiFace.map((face) => {
            return {
                leftCol: face.left_col * width,
                topRow: face.top_row * height,
                rightCol: width - (face.right_col * width),
                bottomRow: height - (face.bottom_row * height)
            }
        });
        return box;
    }
    
    displayFaceBox = (box) => {
        this.setState({box: box})
        console.log(box);
    }
  
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }
  
    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch("https://safe-basin-84320.herokuapp.com/imageurl", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                input: this.state.input
            })
        }) 
        .then(response => response.json())
        .then(response => {
            if (response) {
                fetch("https://safe-basin-84320.herokuapp.com/image", {
                    method: "put",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                }) 
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, { entries: count}))
                })
                .catch(console.log)
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
    }
    
    onRouteChange = (route) => {
        if (route === "signout") {
            this.setState(initialState);
        } else if (route === "home") {
            this.setState({isSignedIn: true});
        }
        this.setState({route:route});
    }
    
    openModal = () => {
        this.setState({isModalOpen: true})
        console.log("open");
    }
    
    closeModal = () => {
        this.setState({isModalOpen: false})
        console.log("close")
    }
  
    render() {
        const { isSignedIn, imageUrl, route, box, isModalOpen} = this.state;
        return (
            <div className="App">
                <Particles className="App-particles" 
                    params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} name={this.state.user.name} />
                {this.state.isModalOpen === false
                ? <p className="main--modal-btn" onClick={this.openModal}><FaBars /></p>
                :
                   <Modal isModalOpen={isModalOpen} closeModal={this.closeModal} />
                }
                { route === "home"
                ? <div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                    <FaceRecognition imageUrl={imageUrl} box={box} />
                </div>
                :(
                    this.state.route === "signin" 
                    ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
                )
                }
            </div>
        );
    }
}

export default App;

