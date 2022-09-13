import React from "react";
import classes from   "./Header.module.scss";
import Configuration from "../../assets/img/config-white.png";
import Graph from "../../assets/img/graph-white.png";
import AppIcon from "../../assets/img/icon-white.png";
import User from "../../assets/img/user-white.png";

export default class Header extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <header className={classes.container}>
        <div className={classes.app}>
          <div className={classes['app-icon']}>
            <img src={AppIcon} alt="app-icon"/>
          </div>
          <span className={classes['app-name']}>
            Pomofocus
          </span>
        </div>
        <div className={classes.actions}>
          <div className={classes.report}>
            <img src={Graph} alt="graph-icon"/>
            <span>
              Report
            </span>
          </div>
          <div className={classes.setting}>            
            <img src={Configuration} alt="configuration-icon"/>
            <span>
              Setting
            </span>
          </div>
          <div className={classes.login}>
          <img src={User} alt="user-icon"/>
            <span>
              Login
            </span>
          </div>
        </div>
      </header>
    );
  }
}
