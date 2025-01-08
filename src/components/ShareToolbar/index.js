import React from 'react'
import { Button } from 'react-bootstrap'
import {
  FacebookButton,
  TwitterButton,
  TumblrButton,
  PocketButton,
} from 'react-social'
import Icon from 'react-fa'
import PropTypes from 'prop-types'
import { facebookAppID } from '../../../config/settings'

import styles from './index.styl'

export default function ShareToolbar({ message, url }) {
  return (
    <div className={styles.wrapper}>
      <FacebookButton element='span' message={message} url={url} appId={facebookAppID}>
        <Button variant='secondary'><Icon name='facebook' /></Button>
      </FacebookButton>
      <TwitterButton element='span' message={message} url={url}>
        <Button variant='secondary'><Icon name='twitter' /></Button>
      </TwitterButton>
      <TumblrButton element='span' message={message} url={url}>
        <Button variant='secondary'><Icon name='tumblr' /></Button>
      </TumblrButton>
      <PocketButton element='span' message={message} url={url}>
        <Button variant='secondary'><Icon name='get-pocket' /></Button>
      </PocketButton>
    </div>
  )
}

ShareToolbar.propTypes = {
  message: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
