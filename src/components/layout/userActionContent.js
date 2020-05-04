import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { setUserInfo } from '../../store/actions/userAction'

require('../../style/Layout.sass')

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      color: 'white'
    },
}));

export default ({setOpen}) => {
    const { user } = useSelector( st => st.user)
    const dp = useDispatch()
    const classes = useStyles()

    const handleLogout = async () => {
        await dp(setUserInfo(null))
        localStorage.removeItem('requestToken')
        console.log(user)
    }

    if(!!user) {
       return (
           <ul>
               <li>
                    <Button 
                        variant="outlined" 
                        className="loginBtm" 
                        className={classes.button}
                        onClick={() => handleLogout()}
                    >Logout</Button>
                </li>
           </ul>
       )
    }

    return (
        <ul>
            <li>
                <Button onClick={() => setOpen(true)} variant="outlined" className="loginBtm" className={classes.button}>SignUp</Button>
            </li>
            <li>
                <Button onClick={() => setOpen(true)} variant="outlined" className="loginBtm" className={classes.button}>Login</Button>
            </li>
        </ul>
    )
}