import React from 'react'
import { Button } from 'react-bootstrap'
import {
  FacebookButton,
  TwitterButton,
  TumblrButton,
  PocketButton,
} from 'react-social'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faXTwitter, faTumblr, faGetPocket } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import { facebookAppID } from '../../../config/settings'

import styles from './index.styl'

export default function ShareToolbar({ message, url }) {
  return (
    <div className={styles.wrapper}>
      <FacebookButton element='span' message={message} url={url} appId={facebookAppID}>
        <Button variant='secondary'><FontAwesomeIcon icon={faFacebook} /></Button>
      </FacebookButton>
      <TwitterButton element='span' message={message} url={url}>
        <Button variant='secondary'><FontAwesomeIcon icon={faXTwitter} /></Button>
      </TwitterButton>
      <TumblrButton element='span' message={message} url={url}>
        <Button variant='secondary'><FontAwesomeIcon icon={faTumblr} /></Button>
      </TumblrButton>
      <PocketButton element='span' message={message} url={url}>
        <Button variant='secondary'><FontAwesomeIcon icon={faGetPocket} /></Button>
      </PocketButton>
    </div>
  )
}

ShareToolbar.propTypes = {
  message: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
