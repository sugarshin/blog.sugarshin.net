import React from 'react'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { HTTPError } from '../../apis/HTTPError'
import styles from './index.styl'

function createErrorMessage(error) {
  return {
    '400': 'Bad Request',
    '403': 'Please try again later',
    '422': 'Unprocessable',
  }[error.message] || 'Unknown Error'
}

export default function SearchError({ error }) {
  console.error(error) // eslint-disable-line no-console
  const message = createErrorMessage(error)
  return (
    <Alert variant='warning' className={styles.root}>
      {message}
    </Alert>
  )
}

SearchError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.instanceOf(Error),
    PropTypes.instanceOf(HTTPError),
  ]),
}
