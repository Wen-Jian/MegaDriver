import firebase from "firebase/app"
import 'firebase/storage'
import { firebaseConfig } from '../config/settings'

const app = (() => {
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig)
    }
    return firebase
  })()

export const defaultStorage = firebase.storage()