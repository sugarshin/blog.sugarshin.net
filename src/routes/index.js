import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from 'containers/App'
import Top from 'routes/Top'
import Article from 'routes/Article'
import Archives from 'routes/Archives'
import Tags from 'routes/Tags'
import Search from 'routes/Search'
import NotFound from 'components/NotFound' // TODO

export default function Routes() {
  return (
    <Switch>
      {/* if you want add other route write here */}
      {/* <Route path='/example' component={() => <div className='example'>example</div>} /> */}
      <Route path='/'>
        <App>
          <Switch>
            <Route exact path='/' component={Top} />
            <Route path='/:year/:month/:day/:title' component={Article} />
            <Route path='/archives/:date' component={Archives} />
            <Route path='/tags/:tag' component={Tags} />
            <Route path='/search' component={Search} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Route>
    </Switch>
  )
}
