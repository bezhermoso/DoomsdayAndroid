// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  explanationTitle: {
    ...ApplicationStyles.subsectionTitle,
    fontWeight: 'bold'
  },
  explanationText: {
    ...ApplicationStyles.screen.sectionText,
    marginHorizontal: Metrics.baseMargin,
    fontWeight: 'normal',
    padding: Metrics.smallMargin,
    textAlign: 'left'
  },
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  }
})
