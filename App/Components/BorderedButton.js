// @flow

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.add('Bordered Button', () =>
  <BorderedButton
    text='real buttons have curves'
    onPress={() => window.alert('Bordered Button Pressed!')}
  />
)

type BorderedButtonProps = {
  onPress: () => void,
  text?: string,
  children?: string,
  navigator?: Object
}

export default class BorderedButton extends React.Component {
  props: BorderedButtonProps

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    return (
      <TouchableOpacity style={styles.borderedButton} onPress={this.props.onPress}>
        <Text style={styles.borderedButtonText}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
