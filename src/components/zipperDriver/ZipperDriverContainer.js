import React, {useState, useEffect} from 'react'
import CardActionArea from '@material-ui/core/CardActionArea'
import { makeStyles } from '@material-ui/core/styles'
import {useSelector} from 'react-redux'
import {defaultStorage} from '../../service/firebase'
import { Container } from '@material-ui/core'
require('../../style/Zipper.sass')

const useStyles = makeStyles({
    root: {
        backgroundColor: 'gray',
        width: '200px',
        height: '200px',
        display: 'inline-flex',
        justifyContent: 'center',
        marginTop: '10px'
    }
});

export default () => {
    const { user } = useSelector(st => st.user)
    const [fileUpload, setFileUpload] = useState(null)
    const [imgs, setImgs] = useState([])
    const [fileLoaded, setFileLoaded] = useState(false)
    const [upLoaded, setUpLoaded] = useState(false)
    const classes = useStyles();

    const uploadImg = (e) => {
        if (!!user) {
            const dateTime = Date.now();
            const timestamp = Math.floor(dateTime / 1000);
            const userRef = defaultStorage.ref().child(`${user.user_no}/${timestamp}.jpg`)
            const [file] = fileUpload.files
            userRef.put(file)
            setUpLoaded(true)
        }
        e.target.value = ''
    }

    const getImgs = () => {
        const userRef = defaultStorage.ref().child(`${user.user_no}`)
        // just for demo, so I return constant array
        return [
            `ii8766/001.jpg`,
            `ii8766/001.jpg`,
            `ii8766/001.jpg`,
            `ii8766/001.jpg`
            ]
    }

    const getUrl = async (path) => {
        const userRef = defaultStorage.ref()
        let url
        // get image src from firebase storage
        return await userRef.child(path).getDownloadURL()
    }

    useEffect(() => {
        if (!fileLoaded || upLoaded) {
            (async function resolveUrl () {
                const imgArray = getImgs()
                const result = []
                for (let idx in getImgs()) {
                    result.push(await getUrl(imgArray[idx]))
                }
                setImgs(result)
                setFileLoaded(true)
            })()
        }
    }, [fileLoaded, upLoaded])

    const ImgCard = (props) => {
        const { url } = props
        console.log(url)
        if (!fileLoaded) {
            return(null)
        }
        return (
            <CardActionArea className={classes.root}>
                <img className="imgList" src={url} alt=""/>
            </CardActionArea>
        )
    }

    if (!user) {
        return (
            <div>Please try to login or register</div>
        )
    }

    return (
        <Container>
            <CardActionArea className={classes.root}>
                <form>
                    <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        ref={ref => setFileUpload(ref)}
                        onChange={(e) => uploadImg(e)}
                    />
                </form>
            </CardActionArea>
            {
                imgs.map((url, index) => (
                    <ImgCard key={index} url={url} />
                ))
            }
        </Container>
    )
}