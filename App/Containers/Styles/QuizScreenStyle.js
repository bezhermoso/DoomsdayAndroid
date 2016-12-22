// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  quizText: {
    ...ApplicationStyles.screen.sectionText,
    fontSize: 18,
    color: Colors.charcoal
  },
  quizDateText: {
    ...ApplicationStyles.screen.sectionText,
    fontSize: 50,
    marginVertical: 0,
    color: Colors.fire,
    textShadowColor: '#8e2122',
    textShadowOffset: { width: 0, height: 1 }
  },
  dayButton: {
    fontSize: 10
  },
  buttonContainer: {
  },
  quizView: {
    marginTop: 10
  },
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.frost
  }
})
