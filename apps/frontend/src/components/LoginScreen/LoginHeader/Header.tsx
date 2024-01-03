import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import Card from '@/UI/Card/Card';
import pomodoroLoginLogo from "@assets/img/brandlogo-white.png";

type HeaderProps = {
  isRegistration?: boolean;
}

const Header: React.FC<HeaderProps> = ({isRegistration = false }: HeaderProps) => {
  return (
    <Card className={classes["login-header"]}>
      <Link to='/'>
        <img src={pomodoroLoginLogo} className={classes["login-header__login-logo"]} alt="login-logo" />
      </Link>
      <div className={classes["login-header__title"]}>
        {isRegistration ? 'Create Account' : 'Login'}
      </div>
    </Card>
  )
}

export default Header;