import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import SlideMonitor from 'redux-slider-monitor'

export default createDevTools(
  <DockMonitor
    defaultPosition='left'
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-p'
    changeMonitorKey='ctrl-m'
    defaultIsVisible={false}
  >
    <LogMonitor />
    <SlideMonitor />
  </DockMonitor>,
)
