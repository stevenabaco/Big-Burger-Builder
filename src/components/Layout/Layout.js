import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const layout = (props) => (
    <>
        <Toolbar />
        <SideDrawer/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
)

export default layout;