// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  borderedButton: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin - 2,
    backgroundColor: Colors.clear,
    borderColor: Colors.stone,
    borderWidth: 1,
    justifyContent: 'center',
  },
  borderedButtonText: {
    color: Colors.cream,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
