import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AlertIcon } from '@primer/octicons-react'
import PropTypes from 'prop-types'
import styles from './index.styl'

export default function NotFound({ pathname }) {
  return (
    <div className={styles.root}>
      <div className={styles.iconContainer}><AlertIcon size='medium' /></div>
      <h4>404 Not Found</h4>
      <p>The requested URL <code>{pathname}</code> was not found on this server.</p>
      <p>
        <LinkContainer to='/' title='Back to Top Page'>
          <Button variant='outline-secondary'>Back to Top Page</Button>
        </LinkContainer>
      </p>
    </div>
  )
}

NotFound.propTypes = {
  pathname: PropTypes.string.isRequired,
}
