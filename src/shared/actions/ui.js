import {PRESENTATION_MODE_DELAY} from '../constants'

export function enablePresentationMode() {
  return {
    type: 'ENABLE_PRESENTATION_MODE',
  }
}

export function disablePresentationMode() {
  return {
    type: 'DISABLE_PRESENTATION_MODE',
  }
}

export function delayEnablePresentationMode() {
  return (dispatch) => {
    setTimeout(() => dispatch(enablePresentationMode()), PRESENTATION_MODE_DELAY)
  }
}

export function delayDisablePresentationMode() {
  return (dispatch) => {
    setTimeout(() => dispatch(disablePresentationMode()), PRESENTATION_MODE_DELAY)
  }
}
