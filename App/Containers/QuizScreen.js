// @flow

import React from 'react'
import { ScrollView, Text, View, RefreshControl, Alert } from 'react-native'
import RoundedButton from '../Components/RoundedButton';
import BorderedButton from '../Components/BorderedButton';
import { connect } from 'react-redux'
import moment from 'moment';

// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuizActions from '../Redux/QuizRedux';
import { Actions as NavigationActions } from 'react-native-router-flux';

// Styles
import styles from './Styles/QuizScreenStyle'
import { Colors } from '../Themes'


type QuizScreenProps = {
  date: moment.Moment,
  guess: null | number,
  result: null | number,
  tryGuess: (dayIndex) => void,
  randomize: () => void,
  clearGuess: () => void,
  days: []
}

function createDaysArray() {
  return [
    { key: 0, name: 'Sunday', abbrev: 'Sun' },
    { key: 1, name: 'Monday', abbrev: 'Mon' },
    { key: 2, name: 'Tuesday', abbrev: 'Tue' },
    { key: 3, name: 'Wednesday', abbrev: 'Wed' },
    { key: 4, name: 'Thursday', abbrev: 'Thu' },
    { key: 5, name: 'Friday', abbrev: 'Fri' },
    { key: 6, name: 'Saturday', abbrev: 'Sat' }
  ]
}

class QuizScreen extends React.Component {

  props: QuizScreenProps;

  constructor (props: QuizScreenProps) {
    super(props)
    this.state = {
      guess: null,
      refreshing: false,
      days: createDaysArray()
    };
  }

  render () {
    let date = this.props.date;
    let formattedDate = date.format('DD MMM YYYY');

    let quizText = null;
    if (this.props.result === null) {
      quizText = (<View style={styles.quizView}>
          <Text style={styles.quizDateText} onLongPress={() => this.showHints(date)}>{formattedDate}</Text>
          <Text style={styles.quizText}>is on a</Text>
        </View>);
    } else {
      quizText = (<View style={styles.quizView}>
        <Text style={styles.quizDateText}>{this.props.result ? 'Correct!' : 'Wrong :('}</Text>
        <Text style={styles.quizText}> </Text>
      </View>);
    }
    return (
        <ScrollView
           style={styles.container}
           refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => { this.onRefresh() }}
              colors={[ Colors.bloodOrange ]}
            ></RefreshControl>}
        >
        {quizText}
        <View style={styles.buttonContainer}>
          {this.state.days.map(day => {
            if (this.props.result === null) {
              return <BorderedButton key={day.key} onPress={() => this.props.tryGuess(day.key)} style={styles.dayButton}>{day.name}</BorderedButton>;
            } else if (date.day() === day.key) {
              return <RoundedButton key={day.key} onPress={() => { this.explain() }} style={styles.dayButton}>{formattedDate + ' is on a ' + day.name}</RoundedButton>;
            } else {
              return <BorderedButton key={day.key} textStyle={{ color: Colors.stone }}>{day.name}</BorderedButton>;
            }
          })}
        </View>
      </ScrollView>
    )
  }

  onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.props.randomize();
      this.setState({ refreshing: false });
      this.props.clearGuess();
    }, 500);
  }

  explain() {
    NavigationActions.explain();
  }

  showHints(date) {
    let century = Math.floor(date.year() / 100) * 100;
    let index = moment([century, 2, 1])
      .subtract(1, 'day')
      .weekday();
    let centuryDoomsday = this.state.days[index];
    let leapYear = date.isLeapYear();

    let hint = `Doomsday of ${century}: ${centuryDoomsday.name}
    
 ${date.year()} ${leapYear ? 'is' : 'is not'} a leap-year.`
    Alert.alert(
      'Hints',
      hint,
      [
        { text: 'More Hints...', onPress: () => { this.moreHints(date) } },
        { text: 'Cancel', onPress: () => {} }
      ]
    );
  }

  moreHints(date) {
    let index = moment([date.year(), 2, 1])
      .subtract(1, 'day')
      .weekday();
    let doomsday = this.state.days[index];
    let hint = `Doomsday of ${date.year()} is ${doomsday.name}`;
    Alert.alert(
      'More hints',
      hint,
      [
        { text: 'Done', onPress: () => {} }
      ]
    );
  }
}

const mapStateToProps = (state) => {
  return {
    date: moment(state.quiz.date),
    guess: state.quiz.guess,
    result: state.quiz.result
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryGuess: (dayIndex) => dispatch(QuizActions.guess(dayIndex)),
    randomize: (dayIndex) => dispatch(QuizActions.random()),
    clearGuess: (dayIndex) => dispatch(QuizActions.clearGuess())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)
