// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressUsage = () => {
    this.toggleDrawer()
    NavigationActions.usageExamples()
  }

  handlePressAPI = () => {
    this.toggleDrawer()
    NavigationActions.apiTesting()
  }

  handlePressTheme = () => {
    this.toggleDrawer()
    NavigationActions.theme()
  }

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  handlePressQuiz = () => {
    this.toggleDrawer();
    NavigationActions.quiz();
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <DrawerButton text='Quiz' onPress={this.handlePressQuiz} />
        <DrawerButton text='Leap Year Quiz' onPress={this.handlePressQuiz} />
        <DrawerButton text='The Algorithm' onPress={this.handlePressQuiz} />
        <DrawerButton text='Cheatsheet' onPress={this.handlePressQuiz} />
        <DrawerButton text='Settings' onPress={this.handlePressQuiz} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
