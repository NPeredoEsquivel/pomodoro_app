import React from "react";
import classes from "./Header.module.scss";

export default class Header extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <header className={classes.container}>
        <div className={classes.app}>
          <div className={classes['app-icon']}>

          </div>
          <span className={classes['app-name']}>
            Pomonico
          </span>
        </div>
        <div className={classes.actions}>
          <div className={classes.report}>
            <div>

            </div>
            <span>
              Report
            </span>
          </div>
          <div className={classes.setting}>
            <div>

            </div>
            <span>
              Settings
            </span>
          </div>
          <div className={classes.login}>
            <div>

            </div>
            <span>
              Login
            </span>
          </div>
        </div>
      </header>
    );
  }
}
