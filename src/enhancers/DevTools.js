import React from 'react'
import { createDevTools } from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'
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
  </DockMonitor>
)
