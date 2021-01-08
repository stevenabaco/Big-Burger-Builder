import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css'

const layout = (props) => (
    <>
        <div> <Toolbar/></div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
)

export default layout;