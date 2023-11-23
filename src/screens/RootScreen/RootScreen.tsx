import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { useAppSelector } from '../../store/hooks';
import { selectTimerType } from '../../store/slices/timerTypeSlice';
import classes from './RootScreen.module.scss'

export default function RootScreen() {
  const { timerType } = useAppSelector(selectTimerType);
  return (
    <div className={`${classes['root-container']} ${classes[`root-container__${timerType}`]}`}>
      <Header/>
      <Outlet/>
    </div>  
  )
}
