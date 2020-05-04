import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
require('../../style/Layout.sass')
import Login from '../login'
import UserActionContent from './userActionContent'
import {useSelector, useDispatch} from 'react-redux'
import regeneratorRuntime from 'regenerator-runtime'
import {setUserInfo} from '../../store/actions/userAction'
import sessionChecker from '../../store/actions/logincheckerAction'
import { defaultStorage } from '../../service/firebase'

export default (props) => {

    const [open, setOpen] = React.useState(false);
    const {loginChecked} = useSelector(st => st.sessionChecker)
    const dp = useDispatch()

    useEffect(() => {
        if (!loginChecked) {
            const { requestToken } = localStorage
            console.log(requestToken)
            let newRequestToken = Math.random().toString(36).substring(2)
            // just for demo, after refresh, I set a constant user information  
            if (!!requestToken) {
                dp(setUserInfo({
                    name: 'Admin',
                    email: 'test@example.com',
                    user_no: 'ii8766',
                    requestToken: newRequestToken
                }))
                localStorage.setItem('requestToken', newRequestToken)
            }
            console.log(loginChecked)
        }
        dp(sessionChecker(true))
    }, [loginChecked])

    if (loginChecked) {
        return (
            <>
                <Container>
                    <Grid container className="header">
                        <Grid item xs={8} alignContent="center" className="logo">
                            <div>
                                ImageMegaZipperDriver
                            </div>
                        </Grid>
                        <Grid item xs={4} className="userAction">
                            <UserActionContent setOpen={setOpen} />
                        </Grid>
                    </Grid>
                    <Login open={open} setOpen={setOpen} />
                </Container>
                {props.children}
            </>
        )
    }

    return (null)
}