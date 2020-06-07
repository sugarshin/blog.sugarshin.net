import thunk from 'redux-thunk'
import Articles from 'apis/Articles'
import Search from 'apis/Search'

const api = {
  Articles,
  Search,
}

export function createThunkMiddleware() {
  return thunk.withExtraArgument({ api })
}
