import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
type MyProps = {};

type MyStates = {};
export default class App extends React.PureComponent<MyProps, MyStates>{

  render(){  
    return (
        <>
            <Header />
            <Main />
            <footer></footer>
        </>
    );
  }
}
