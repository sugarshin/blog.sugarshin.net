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
      <FacebookButton element='span' message={message} url={url}>
        <Button><Icon name='facebook' /></Button>
      </FacebookButton>
      <TwitterButton element='span' message={message} url={url}>
        <Button><Icon name='twitter' /></Button>
      </TwitterButton>
      <GooglePlusButton element='span' message={message} url={url}>
        <Button><Icon name='google-plus' /></Button>
      </GooglePlusButton>
      <TumblrButton element='span' message={message} url={url}>
        <Button><Icon name='tumblr' /></Button>
      </TumblrButton>
      <PocketButton element='span' message={message} url={url}>
        <Button><Icon name='get-pocket' /></Button>
      </PocketButton>
    </div>
  );
}
