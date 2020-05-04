import ReactDOM from "react-dom";
import React from 'react'
import Container from '@material-ui/core/container'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"
import { Provider } from 'react-redux'
import Layout from './components/layout'
import Driver from './components/zipperDriver'
import store from './store/index'

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Container >
                    <Layout>
                        <Driver />
                    </Layout>
                </Container>

                <Switch>
                    <Route path='/u/:id'>
                        <Driver />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
  );