import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'actions'

export const mapStateToProps = state => ({ ...state })
export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

const connectStore = (...args) => WrappedComponent => {
  if (args.length > 0) {
    return connect(...args)(WrappedComponent)
  }
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
}

export default connectStore
