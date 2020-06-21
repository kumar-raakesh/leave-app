import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);


const dates = (startDate: moment, endDate: moment, focusedInput: 'startDate' | 'endDate') => {
  if (focusedInput === 'startDate') {
    if (startDate && endDate) {
      return ({ startDate, endDate: null, focusedInput: 'endDate' });
    }
    return ({ startDate, endDate, focusedInput: 'endDate' });
  }

  if (focusedInput === 'endDate') {
    if (endDate && startDate && endDate.isBefore(startDate)) {
      return ({ startDate: endDate, endDate: null, focusedInput: 'endDate' });
    }
    return ({ startDate, endDate, focusedInput: 'startDate' });
  }

  return ({ startDate, endDate, focusedInput });
};

export const Week = (props) => {
  const {
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    startOfWeek,
    onDatesChange,
    isDateBlocked,
    onDisableClicked
  } = props;

  const days = [];
  const endOfWeek = startOfWeek.clone().endOf('week');

  const getDayRange = moment.range(startOfWeek, endOfWeek);
  Array.from(getDayRange.by('days')).map((day: moment) => {
    const onPress = () => {
      if (isDateBlocked(day)) {
        onDisableClicked(day);
      } else if (range) {
        let isPeriodBlocked = false;
        const start = focusedInput === 'startDate' ? day : startDate;
        const end = focusedInput === 'endDate' ? day : endDate;
        if (start && end) {
          moment.range(start, end).by('days', (dayPeriod: moment) => {
            if (isDateBlocked(dayPeriod)) isPeriodBlocked = true;
          });
        }
        onDatesChange(isPeriodBlocked ?
          dates(end, null, 'startDate') :
          dates(start, end, focusedInput));
      } else {
        onDatesChange({ date: day });
      }
    };

    const isDateSelected = () => {
      if (range) {
        if (startDate && endDate) {
          return day.isSameOrAfter(startDate, 'day') && day.isSameOrBefore(endDate, 'day');
        }
        return (startDate && day.isSame(startDate, 'day')) || (endDate && day.isSame(endDate, 'day'));
      }
      return date && day.isSame(date, 'day');
    };

    const isBlocked = isDateBlocked(day);
    const isSelected = isDateSelected();

    const style = [
      styles.day,
      isBlocked && styles.dayBlocked,
      isSelected && styles.daySelected
    ];

    const styleText = [
      styles.dayText,
      isBlocked && styles.dayDisabledText,
      isSelected && styles.daySelectedText
    ];

    days.push(
      <TouchableOpacity
        key={day.date()}
        style={style}
        onPress={onPress}
        disabled={isBlocked && !onDisableClicked}
      >
        <Text style={styleText}>{day.date()}</Text>
      </TouchableOpacity>
    );
    return null;
  });

  return (
    <View style={styles.week}>{days}</View>
  );
};

export const Month = (props) => {
  const {
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    currentDate,
    focusedMonth,
    onDatesChange,
    isDateBlocked,
    onDisableClicked
  } = props;

  const dayNames = [];
  const weeks = [];
  const startOfMonth = focusedMonth.clone().startOf('month').startOf('week');
  const endOfMonth = focusedMonth.clone().endOf('month');
  const weekRange = moment.range(currentDate.clone().startOf('week'), currentDate.clone().endOf('week'));

  Array.from(weekRange.by('days')).map((day: moment) => {
    dayNames.push(
      <Text key={day.date()} style={styles.dayName}>
        {day.format('dddd').substr(0, 1)}
      </Text>
    );
    return null;
  });

  const getMonthRange = moment.range(startOfMonth, endOfMonth);
  Array.from(getMonthRange.by('weeks')).map((week: moment) => {
    weeks.push(
      <Week
        key={week}
        range={range}
        date={date}
        startDate={startDate}
        endDate={endDate}
        focusedInput={focusedInput}
        currentDate={currentDate}
        focusedMonth={focusedMonth}
        startOfWeek={week}
        onDatesChange={onDatesChange}
        isDateBlocked={isDateBlocked}
        onDisableClicked={onDisableClicked}
      />
    );
    return null;
  });


  return (
    <View style={styles.month}>
      <View style={styles.week}>
        {dayNames}
      </View>
      {weeks}
    </View>
  );
};

export default class Dates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment(),
      focusedMonth: moment().startOf('month')
    }
  }
  componentDidMount() {
    this.setFocusedMonth();
  }

  setFocusedMonth = () => {
    const { focusedMonth } = this.props;
    if (focusedMonth) {
      this.setState({ focusedMonth: moment(focusedMonth, 'MMMM D, YYYY h:mm a').startOf('month') });
    }
  };


  render() {
    console.log("prps", this.props)
    const previousMonth = () => {
      this.setState({ focusedMonth: this.state.focusedMonth.add(-1, 'M') });
    };

    const nextMonth = () => {
      this.setState({ focusedMonth: this.state.focusedMonth.add(1, 'M') });
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={previousMonth}>
            <Image
              source={require("../src/image/left-arrow.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {this.state.focusedMonth.format('MMMM')
              +
              " "
              +
              this.state.focusedMonth.format('YYYY')
            }
          </Text>
          <TouchableOpacity onPress={nextMonth}>
            <Image
              source={require("../src/image/right-arrow.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>
          <Month
            range={this.props.range}
            date={this.props.date}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            focusedInput={this.props.focusedInput}
            currentDate={this.state.currentDate}
            focusedMonth={this.state.focusedMonth}
            onDatesChange={this.props.onDatesChange}
            isDateBlocked={this.props.isDateBlocked}
            onDisableClicked={this.props.onDisableClicked}
          />
        </View>
      </View>

    );
  }
}




const styles = StyleSheet.create({
  calendar: {
    backgroundColor: '#ebedf6',
    marginHorizontal: 14,
  },
  container: {
    flex: 1,
    backgroundColor: "#ebedf6",
  },
  header: {
    height: 40,
    backgroundColor: "#2fca99",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24
  },
  headerText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "500",
    marginHorizontal: 20

  },
  week: {
    flexDirection: 'row'
  },
  dayName: {
    flexGrow: 1,
    flexBasis: 1,
    margin: 1,
    padding: 10,
    textAlign: 'center',
    color: "#424f92",
    fontWeight: '600',
    backgroundColor: "#FFF"

  },
  day: {
    flexGrow: 1,
    flexBasis: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 245)',
    margin: 1,
    padding: 10,

  },
  dayBlocked: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  daySelected: {
    backgroundColor: 'rgb(52,120,246)'
  },
  dayText: {
    // color: 'rgb(0, 0, 0)',
    color: "#424f92",
    fontWeight: '600'
  },
  dayDisabledText: {
    color: 'gray',
    opacity: 0.5,
    fontWeight: '400'
  },
  daySelectedText: {
    color: 'rgb(252, 252, 252)'
  },
  arrow: {
    height: 10,
    width: 10
  }
});