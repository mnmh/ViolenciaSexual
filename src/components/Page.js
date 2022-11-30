import React, { Component } from 'react'
import axios from 'axios'
import parse from 'html-react-parser'

export default class App extends Component {
  //Construir e iniciar el estado del componente
  constructor() {
    super();
    this.state = {
        data:[]
    }
  }
  //Recibir los datos del endpoint
  receiveData(){
    axios
        .get(`https://museodememoria.gov.co/wp-json/wp/v2/pages/14856`, {})
        .then(res => {
            const data = res.data
            console.log(data)
            const title = parse(data.title.rendered)
            const content = parse(data.content.rendered)
            this.setState({title})
            this.setState({content})
          })
        .catch((error) => {
            console.log(error)
        })
  }
  //Llamar a la función receiveData
  componentDidMount(){
    this.receiveData()
  }
  render() {
      return (
        <>
        <h1>{this.state.title}</h1>
        {this.state.content}
        </>
      )
    }
}