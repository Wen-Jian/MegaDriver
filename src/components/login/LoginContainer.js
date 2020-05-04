import React, {useState}from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import regeneratorRuntime from 'regenerator-runtime'
import { setUserInfo } from '../../store/actions/userAction'
import axios from 'axios'
require('../../style/Login.sass')

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  

export default ({open, setOpen}) => {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const dp = useDispatch()

    const handleClose = () => {
        setAccount('')
        setPassword('')
        setError(null)
        setOpen(false)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loginResult = await axios.get(`http://localhost:5000/login?account=${account}&password=${password}`)
            console.log(loginResult.data)
            dp(setUserInfo(loginResult.data))
            localStorage.setItem('requestToken', loginResult.request_token)
            handleClose()
        } catch(e) {
            console.log(e.message)
            setError('incorrect account or password')
            dp(setUserInfo(null))
            localStorage.removeItem('requestToken')
        }
    }

    const classes = useStyles();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
        >
            <div className="modalContentBackground">
                <div className="modalContent">
                    <p className="error">{error}</p>
                    <form action="">
                        <div>
                            <label htmlFor="">Account</label><br />
                            <input type="text" autoFocus onChange={(e) => setAccount(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Password</label><br />
                            <input type="text" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="loginBtn">
                            <Button variant="contained" color="primary" onClick={(e) => handleLogin(e)}>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}