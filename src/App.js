import React, { Component } from 'react';
import { Layout, Table, Row, Col, Modal, Form, Input, Button, Icon, Cascader, Select, Radio, Progress, Card } from 'antd';

import data from './data'

import { filter, uniqBy, orderBy } from 'lodash'

import 'antd/lib/layout/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/input-number/style/css';
import 'antd/lib/progress/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/slider/style/css';
import 'antd/lib/radio/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/card/style/css';
import './App.scss';
import ReactGA from 'react-ga';


const { Option } = Select;
const { Content, Footer } = Layout;



//console.log("this.state",this.state);

class App extends Component {
  state = {
    data: data,
    position:0,
    lastAnswer:'',
    progress:0,
    loading: false,
    visible: false,
    totalScore: {
      'Benoît Kandel': 0,
      'Valéry Sohm': 0,
      'Christian Estrosi': 0,
      'Patrick Allemand': 0,
      'Philippe Vardon': 0,
      'Jean-Marc Governatori': 0,
      'Mireille Damiano': 0
    },
    finalArray:[]
  };

  incrementCount = (e) => {
    this.state.lastAnswer = e.currentTarget.value;

    if(this.state.position == this.state.data.length-1){
              this.state.progress = (this.state.position+1)/this.state.data.length*100;
              var mapos = this.state.position;
              for (let i = 0; i < this.state.data[mapos].Reponses.length; i++) {
                if(this.state.data[mapos].Reponses[i].name == this.state.lastAnswer){
                  var scoreReponse = this.state.data[mapos].Reponses[i]
                }
              }


              this.setState({totalScore:{
                'Christian Estrosi' : this.state.totalScore['Christian Estrosi'] + scoreReponse['Christian Estrosi'],
                'Jean-Marc Governatori' : this.state.totalScore['Jean-Marc Governatori'] + scoreReponse['Jean-Marc Governatori'],
                'Patrick Allemand' : this.state.totalScore['Patrick Allemand'] + scoreReponse['Patrick Allemand'],
                'Philippe Vardon' : this.state.totalScore['Philippe Vardon'] + scoreReponse['Philippe Vardon'],
                'Benoît Kandel' : this.state.totalScore['Benoît Kandel'] + scoreReponse['Benoît Kandel'],
                'Valéry Sohm' : this.state.totalScore['Valéry Sohm'] + scoreReponse['Valéry Sohm'],
                'Mireille Damiano' : this.state.totalScore['Mireille Damiano'] + scoreReponse['Mireille Damiano']
              }},() =>{
                        var sortable = [];
                        for (var candidat in this.state.totalScore) {
                            sortable.push([candidat, this.state.totalScore[candidat]]);
                        }
                        sortable.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        this.state.finalArray[0] = sortable[0];
                        this.state.finalArray[1] = sortable[1];
                        this.state.finalArray[2] = sortable[2];

                        //console.log("Final Array : ", this.state.finalArray);
                        this.setState({
                          visible: true,
                        });
                        ReactGA.initialize('XX-XXXXXXX-X');
                        ReactGA.event({
                          category: 'Candidat',
                          action: sortable[0][0]
                        });
                        return;
              })
              return;
    }

    //console.log(this.state.totalScore);
    this.state.progress = (this.state.position+1)/this.state.data.length*100;
    var mapos = this.state.position;
    for (let i = 0; i < this.state.data[mapos].Reponses.length; i++) {
      if(this.state.data[mapos].Reponses[i].name == this.state.lastAnswer){
        var scoreReponse = this.state.data[mapos].Reponses[i]
      }
    }

    ReactGA.initialize('XX-XXXXXXX-X');
    ReactGA.event({
      category: this.state.data[mapos].Question,
      action: scoreReponse.name
    });

    this.setState({totalScore:{
      'Philippe Vardon' : this.state.totalScore['Philippe Vardon'] + scoreReponse['Philippe Vardon'],
      'Benoît Kandel' : this.state.totalScore['Benoît Kandel'] + scoreReponse['Benoît Kandel'],
      'Valéry Sohm' : this.state.totalScore['Valéry Sohm'] + scoreReponse['Valéry Sohm'],
      'Christian Estrosi' : this.state.totalScore['Christian Estrosi'] + scoreReponse['Christian Estrosi'],
      'Jean-Marc Governatori' : this.state.totalScore['Jean-Marc Governatori'] + scoreReponse['Jean-Marc Governatori'],
      'Patrick Allemand' : this.state.totalScore['Patrick Allemand'] + scoreReponse['Patrick Allemand'],
      'Mireille Damiano' : this.state.totalScore['Mireille Damiano'] + scoreReponse['Mireille Damiano']
    }},() =>{

      this.setState({position: this.state.position + 1});
    })
  }

  handleAnswer = (e) => {
    this.state.lastAnswer = e.currentTarget.value;
  }

  handleOk = (e) => {
    this.setState({
      data:data,
      position:0,
      progress:0,
      loading: false,
      visible: false,
    });
    window.location.reload();
  }

  render() {
    const { visible, loading } = this.state;

    const radioStyle = {
      display: 'block',
      height: 'auto',
      lineHeight: '30px',
      margin: '10px 10px 10px 35px',
      borderRadius: "5px",
      width:"300px",
      textAlign:"left",
      border: "1px solid #000f2b",
      padding:"15px",
      fontSize:"24px",
      fontSize:"20px",
      color: "rgba(0, 0, 0, 0.65) !important",
      "&:hover": {
        color: "rgba(0, 0, 0, 0.65) !important"
      }
    };
    const titleStyle = {
      textAlign:"center",
      padding:"-5px",
      fontSize:"24px",
      fontWeight:"bold"
    }
    const subTitleStyle = {
      textAlign:"center",
      fontSize:"20px"
    }
    const nextStyle = {
      display:'inline-block',
      float:'right',
      marginRight:"40px",
      border: "1px solid #000f2b",
      borderRadius: "5px",
      padding:"15px",
      display:"none"
   }
   const questionStyle =  {
      textAlign:"left",
      paddingRight : "20px",
      paddingLeft : "20px",
      height:"50px",
      position:"relative",
      marginLeft:"18px",
      fontSize:"20px"
    }
    const themeStyle =  {
      textAlign:"left",
      paddingRight : "20px",
      paddingLeft : "20px",
      position:"relative",
      color:"#000f2b",
      marginTop:"20px",
      marginLeft:"18px",
      fontWeight:"bold",
      fontSize:"13px"
    }

    const fermerStyle = {
      backgroundColor: "#1EA0E6"
    }

    const logoStyle = {
      float:"right",
      marginRight:"40px",
      marginTop:"30px"
    }

    const sourceStyle={
      textAlign:"left",
      float:"left",
      paddingRight : "20px",
      paddingLeft : "0px",
      left:"37px",
      position:"relative",
      color:"#999999",
      fontSize:"11px",
      marginTop:"35px"
    }

    const groupStyle = {
      height:"220px"
    }

    const overallStyle={
      width:"100%",
      textAlign:"center"
    }

    const progressStyle = {
      width:"82%",
      marginLeft:"35px",
      marginTop:"20px"
    }

    const answersStyle = {
      marginTop: '40px'
    }

    var resultOptions = this.state.data[this.state.position].Reponses.map(function(result){
      return <Radio.Button  style={radioStyle} value={result.name} onClick={this.incrementCount}>{result.name}</Radio.Button>
    },this);

    var i=0;
    var resultCandidats = this.state.finalArray.map(function(result){
      i++;
      //
      return <Radio.Button checked={false} defaultChecked={false}  style={radioStyle} value={result}>{i}. {result[0]}</Radio.Button>

    },this);
    return (
      <div>
      <Row>
       <Col style={overallStyle}>
        <Row>
          <h1 style={titleStyle}>
          Municipales 2020 à Nice
          </h1>
        </Row>
          <h2 style={subTitleStyle}>De quel candidat êtes-vous le plus proche ?</h2>
          <Col style={progressStyle}>
            <Progress percent={this.state.progress} showInfo={false} status="active"  />
          </Col>
        <Row>
          <h4 style={themeStyle}>{this.state.data[this.state.position].Theme}</h4>
        </Row>
        <Row>
          <h4 style={questionStyle}>{this.state.data[this.state.position].Question}</h4>
        </Row>
        <Row>
        <Col style={answersStyle}>
          <Radio.Group defaultValue="aaa" value="aaaa" style={groupStyle} buttonStyle="solid">
            {resultOptions}
          </Radio.Group>
          </Col>
        </Row>

        <Row>
        <a href="#" style={nextStyle} onClick={this.incrementCount}>suivant ></a>
        </Row>
      </Col>
      </Row>
      <Row  style={overallStyle}>
        <span style={sourceStyle}>Source : programme des candidats</span>
        <img style={logoStyle} width="90" src="" />
      </Row>
      <Modal
          visible={this.state.visible}
          title="Résultat"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable={false}
          footer={[
            <Button key="submit" type="primary" style={fermerStyle} loading={loading} onClick={this.handleOk}>
              Fermer
            </Button>,
          ]}
        >
          <p>Voici les candidats dont vous semblez le plus proche :</p>
          <Radio.Group  buttonStyle="solid">
            {resultCandidats}
          </Radio.Group>
        </Modal>
    </div>
    )
  }
}

export default App;
