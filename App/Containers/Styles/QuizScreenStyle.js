// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  quizText: {
    ...ApplicationStyles.screen.sectionText,
    fontSize: 16,
    color: Colors.cream,
    textShadowColor: Colors.blackStone,
    textShadowOffset: { width: 1, height: 2 }
  },
  quizDateText: {
    ...ApplicationStyles.screen.sectionText,
    fontSize: 50,
    marginVertical: 0,
    color: Colors.cream,
    textShadowColor: Colors.blackStone,
    textShadowOffset: { width: 1, height: 3 }
  },
  dayButton: {
    fontSize: 10
  },
  buttonContainer: {
    paddingTop: 10
  },
  quizView: {
    paddingVertical: 10,
    backgroundColor: Colors.stone,
    elevation: 10
  },
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.blackStone
  }
})
