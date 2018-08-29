import {INJECT_EV} from './constants'

const port = chrome.runtime.connect();

port.postMessage({ev: INJECT_EV});