'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux'
const FILTER_UPDATE = 'FILTER_UPDATE';

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterChange: (filter) => {
      dispatch(appUpdate({}, {filter, type: FILTER_UPDATE}))
    }
  }
}

function appUpdate(state = {filter: ''}, action) {
  switch (action.type) {
    case FILTER_UPDATE:
      return {filter: action.filter, type: action.type};
    default:
      return state;
  }
}

let reducer = combineReducers({appUpdate});
let store = createStore(reducer);

const mapStateToProps = (state) => {
  return {
    filter: state.appUpdate.filter
  }
}

class Pwidget extends Component {

  render() {
    return (
      <Provider store={store}>
        <AConnectedWidget filter={store.getState().filter}/>
      </Provider>
    );
  }
}

connect(
  mapStateToProps,
  mapDispatchToProps
)(Pwidget);

class Awidget extends Component {
  render() {
    let { filter } = store.getState().appUpdate;
    let filteredResults = this.filterResults_(filter);
    let renderRow = (row) => { return <Text>{row}</Text> };
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(filteredResults);
    return (
      <View>
        <Text> input your search </Text>
        <TextInput onChangeText={this.onFilterChange_} />
        <Text> Here are the results: </Text>
        <ListView dataSource={dataSource}
                  renderRow={renderRow}/>
      </View>
    );
  }

  onFilterChange_(filter) {
    store.dispatch(appUpdate({}, {filter, type: FILTER_UPDATE}));
  }

  filterResults_(filter) {
    let result = this.data();
    if(filter) {
      return result.filter(x => x.contains(filter));
    } else {
      return result;
    }
  }

  data() {
    return ['a', 'b', 'bar', 'baz', 'foo', 'waldo', 'fred', 'quux', 'x', 'y']
  }
}

let AConnectedWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(Awidget);

AppRegistry.registerComponent('awidget', () => Pwidget);
