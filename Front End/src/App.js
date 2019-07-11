import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      festivals: null ,
      fetched:false,
    };
  }

  fetchFestivals=()=>{

    fetch('http://localhost/drupalmod2/festivals?_format=json', {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
      }).then(response=>response.json()).then(data=>{if(data)this.setState({fetched:true,festivals:data})})
    }

    componentDidMount=()=>{
      this.fetchFestivals();
      
    }
  render(){    
    console.log(this.state.festivals)
  return (
    <div className="App">
      <h1 style={{fontSize:'50px'}}>A PWA with Headless Drupal</h1>
       <h1>Festivals</h1> 
      {this.state.fetched&&this.state.festivals&&this.state.festivals.map((item)=>{
        return(<div key={item.nid[0].value} className='festival'>
        <h2>{item.title[0].value}</h2>
        <img src={item.field_festival_image[0].url} />
        {item.body[0].value.substring(3,(item.body[0].value.length-12))}
        </div>)
      })}
      
    </div>
  )
}
}


