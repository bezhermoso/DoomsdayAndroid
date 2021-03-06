// @flow

import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ExplanationScreenStyle'

class Emphasized extends React.Component {
  render() {
    return (
      <Text style={{ fontWeight: 'bold' }}>{this.props.children}</Text>
    );
  }
}

class ExplanationScreen extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    let noOf12s = Math.floor(this.props.distance / 12);
    let remainder = this.props.distance % 12;
    let noOf4s = Math.floor(remainder / 4);
    let offset = noOf12s + remainder + noOf4s;
    let keyDateForMonth = this.keyDateForMonth(this.props.date.month() + 1, this.props.date.isLeapYear());
    let dateInMonth = this.props.date.date();
    let keyDistance = Math.max(keyDateForMonth, dateInMonth) - Math.min(keyDateForMonth, dateInMonth);

    let preface = null;

    if (this.props.date.month() < 3) {
      preface = (
        <Text style={styles.explanationText}>
          <Emphasized>{this.props.date.year()} {this.props.date.isLeapYear() ? 'is a' : 'is not a' } leap-year</Emphasized>
        </Text>
      );
    }

    let dateOps = [];
    let day = this.props.doomsday.day();

    if (keyDateForMonth > dateInMonth) {
      let result = (day - (keyDistance % 7));
      dateOps.push(
        <Text style={styles.explanationText}>
          Key date &gt; given date; <Emphasized>Doomsday - (distance % 7)</Emphasized>
        </Text>
      );
      dateOps.push(
        <Text style={styles.explanationText}>
          {this.props.doomsday.format('dddd')} - ({keyDistance} % 7) = {day} - {keyDistance % 7} = {result}
        </Text>
      );
      if (result < -6) {
        <Text style={styles.explanationText}>
          {result} = { result % 7 }
        </Text>
        result = result % 7;
      }

      if (result < 0) {
        dateOps.push(
          <Text style={styles.explanationText}>
          {result} = {result + 7}
        </Text>);
        result = result + 7;
      }

    } else {
      let result = (day + (keyDistance % 7));
      dateOps.push(
        <Text style={styles.explanationText}>
          Key date &lt; given date; <Emphasized>Doomsday + (distance % 7)</Emphasized>
        </Text>
      );
      dateOps.push(
        <Text style={styles.explanationText}>
          {this.props.doomsday.format('dddd')} + ({keyDistance} % 7) = {day} + {keyDistance % 7} = {result}
        </Text>
      )
      if (result > 6) {
        dateOps.push(<Text style={styles.explanationText}>
          {result} % 7 = {result % 7}
        </Text>);
      }
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.explanationTitle}>Doomsday of {this.props.date.year()}</Text>
        <Text style={styles.explanationText}>
          Doomsday of {this.props.century} is <Emphasized>{this.props.centuryDoomsday.format('dddd')}</Emphasized>
        </Text>
        <Text style={styles.explanationText}>
          Distance from century = <Emphasized>{this.props.distance}</Emphasized>
        </Text>
        <Text style={styles.explanationText}>
          No of 12's in <Emphasized>{this.props.distance}</Emphasized> = <Emphasized>{noOf12s}</Emphasized>
        </Text>
        <Text style={styles.explanationText}>
          Remainder = <Emphasized>{remainder}</Emphasized>
        </Text>
        <Text style={styles.explanationText}>
          No of 4's in remainder = <Emphasized>{noOf4s}</Emphasized>
        </Text>
        <Text style={styles.explanationText}>
          Offset = {noOf12s} + {remainder} + {noOf4s} = <Emphasized>{offset}</Emphasized>
        </Text>
        <Text style={styles.explanationText}>
          Doomsday of {this.props.date.year()} = ({this.props.centuryDoomsday.format('dddd')} + {offset}) % 7 = {this.props.centuryDoomsday.day() + offset} % 7 = <Emphasized>{this.props.doomsday.day()}</Emphasized>
        </Text>
        <Text style={styles.explanationText}>
          Doomsday of {this.props.date.year()} = <Emphasized>{this.props.doomsday.format('dddd')}</Emphasized>
        </Text>
        <Text style={styles.explanationTitle}>Day-of-week of {this.props.date.format('DD MMMM')}</Text>
        {preface}
        <Text style={styles.explanationText}>
          Key date of {this.props.date.format('MMMM')} = <Emphasized>{keyDateForMonth}</Emphasized>
        </Text>
        <Text style={styles.explanationText}>
          Distance = {Math.max(keyDateForMonth, dateInMonth)} - {Math.min(keyDateForMonth, dateInMonth)} = <Emphasized>{keyDistance}</Emphasized>
        </Text>
        {dateOps.map((e, i) => {
          return <View key={i}>{e}</View>
        })}
        <Text style={styles.explanationText}>
          Day-of-Week = <Emphasized>{this.props.date.format('dddd')}</Emphasized>
        </Text>
      </ScrollView>
    )
  }

  keyDateForMonth(month, leapYear) {
    if (month === 1) {
      return leapYear ? 4 : 3;
    } else if (month === 2) {
      return leapYear ? 29 : 28;
    } else if (month === 3) {
      return 7;
    } else if (month % 2 === 0) {
      return month;
    } else {
      return ({
        5: 9,
        9: 5,
        7: 11,
        11: 7,
      })[month];
    }
  }
}

const mapStateToProps = (state) => {
  let date = moment(state.quiz.date);
  let century = Math.floor(date.year() / 100) * 100;
  return {
    date: date,
    century: century,
    doomsday: moment([date.year(), 2, 1]).subtract(1, 'day'),
    centuryDoomsday: moment([century, 2, 1]).subtract(1, 'day'),
    distance: date.year() % 100
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplanationScreen)
