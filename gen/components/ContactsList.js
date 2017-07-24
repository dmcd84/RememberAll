import React from 'react';
import { Text, View } from 'react-native';
import Contact from './Contact'
import SearchBar from './SearchBar'

import realm from '../models/realm'


class ContactsList extends React.Component {

  constructor() {
    super()
    this.state = {refreshing: false, text: null}
    this.refreshContacts = this.refreshContacts.bind(this)
    realm.addListener('change', () => {
      this.setState({ refreshing: true })
    })
  }

  refreshContacts(text) {
    this.setState({refreshing: true, text: text})
  }

  renderContacts(text = null) {
    let filteredContacts = null
    if (text === null) {
      filteredContacts = realm.objects('Contact')
    } else {
      filteredContacts = realm.objects('Contact').filtered(`name CONTAINS[c] "${text}"`)
    }
    return filteredContacts.map((contact, i) =>
      <Contact
        name={contact.name}
        key={`contact#${i}`}
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

export default ContactsList
