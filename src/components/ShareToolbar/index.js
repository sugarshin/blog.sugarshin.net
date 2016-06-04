import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import {
  FacebookButton,
  TwitterButton,
  GooglePlusButton,
  TumblrButton,
  PocketButton
} from 'react-social';
import Icon from 'react-fa';
import styles from './index.styl';

export default function ShareToolbar({ message, url }) {
  return (
    <div className={styles.wrapper}>
      <Button>
        <FacebookButton element='span' url={url} message={message}><Icon name='facebook' /></FacebookButton>
      </Button>
      <Button>
        <TwitterButton element='span' url={url} message={message}><Icon name='twitter' /></TwitterButton>
      </Button>
      <Button>
        <GooglePlusButton element='span' url={url} message={message}><Icon name='google-plus' /></GooglePlusButton>
      </Button>
      <Button>
        <TumblrButton element='span' url={url} message={message}><Icon name='tumblr' /></TumblrButton>
      </Button>
      <Button>
        <PocketButton element='span' url={url} message={message}><Icon name='get-pocket' /></PocketButton>
      </Button>
    </div>
  );
}
