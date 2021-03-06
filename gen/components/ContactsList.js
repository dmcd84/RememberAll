import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Contact from './Contact'
import SearchBar from './SearchBar'

import realm from '../models/realm'


class ContactsList extends React.Component {

  constructor() {
    super()
    this.state = {refreshing: false, text: null}
    this.refreshContacts = this.refreshContacts.bind(this)
  }

  componentDidMount() {
    realm.addListener('change', () => {
      this.setState({ refreshing: true })
    })
  }

  componentWillUnmount() {
    realm.removeAllListeners();
  }

  refreshContacts(text) {
    this.setState({refreshing: true, text: text})
  }

  renderContacts(text = null) {
    let filteredContacts
    if (text === null) {
      filteredContacts = realm.objects('Contact');
    } else {
      filteredContacts = realm.objects('Contact').filtered(`name CONTAINS[c] "${text}" OR role CONTAINS[c] "${text}" OR organisation CONTAINS[c] "${text}" OR context CONTAINS[c] "${text}" OR tags.name CONTAINS[c] "${text}"`);
    }
    return filteredContacts.map((contact, i) =>
      <Contact
        contact={contact}
        key={`contact#${i}`}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    return (
      <View>
        <SearchBar onChangeText={this.refreshContacts}/>
        {this.renderContacts(this.state.text)}
      </View>
    )
  };
};

const styles = StyleSheet.create({
  maintitle: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Euphemia UCAS',
  },
});

export default ContactsList
