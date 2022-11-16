import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import classes from './App.module.scss';

interface IAppProps {}
interface IAppState {
  backgroundColorClass: string,
};

export default class App extends React.PureComponent<IAppProps, IAppState>{
  state = {
    backgroundColorClass: 'pomodoro',
  }

  constructor(props: IAppProps){
    super(props)
    this.handleBackgroundColor = this.handleBackgroundColor.bind(this);
  }

  handleBackgroundColor(backgroundColorClass){
    this.setState({ backgroundColorClass })
  }


  render(){  
    return (
        <div className={`${classes.container} ${classes[this.state.backgroundColorClass]}`}>
            <Header />
            <Main handleBackgroundColor={this.handleBackgroundColor} />
            <footer></footer>
        </div>
    );
  }
}