// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.redOrange,
    justifyContent: 'center',
    elevation: 3
  },
  buttonText: {
    color: Colors.cream,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
