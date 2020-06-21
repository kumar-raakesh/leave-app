/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Date from "./src/Date";
import ModalComponent from "./src/Components/ModalComponent"
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: null,
      todate: null,
      focus: 'startDate',
      startDate: null,
      endDate: null,
      text: "",
      fromDate: false,
      modalVisible: false,
      fromDateVisible: false,
      toDateVisible: false,

    }
  }

  render() {
    var a = moment(
      [this.state.startDate && this.state.startDate.format('DD-MM-YYYY') || this.state.date && this.state.date.format('DD-MM-YYYY')]
    );
    var b = moment([
      this.state.endDate && this.state.endDate.format('DD-MM-YYYY') || this.state.todate && this.state.todate.format('DD-MM-YYYY')]
    );
    var diffDays = a.diff(b, 'days')
    const { startDate, endDate, text, date, todate } = this.state
    const isDateBlocked = (date) =>
      date.isBefore(moment(), 'day');

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    const onDateChange = ({ date }) => {
      if (this.state.fromDate) {
        this.setState({
          ...this.state,
          date,
          fromDateVisible: false,
          fromDate: false
        });
      } else {
        this.setState({
          ...this.state,
          todate: date,
          fromDateVisible: false,
        });
      }
    }

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Apply Leave
            </Text>
          </View>
        </View>
        <ScrollView>
          <Date
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            title={"Apply Leave"}
            range
          />
          <View style={styles.boxOuter}>
            <View style={styles.dateBox}>
              <Text style={styles.fromDate}>{this.state.startDate && this.state.startDate.format('DD-MM-YYYY') || this.state.date && this.state.date.format('DD-MM-YYYY')}</Text>
            </View>
            <TouchableOpacity style={styles.calImage} onPress={() => {
              this.setState({
                fromDateVisible: true,
                fromDate: true,
              })
            }}>
              <Image source={require("./src/image/cal-icons.png")}
                style={{
                  height: 30,
                  width: 30
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.boxOuter}>
            <View style={styles.dateBox}>
              <Text style={styles.fromDate}>{this.state.endDate && this.state.endDate.format('DD-MM-YYYY') || this.state.todate && this.state.todate.format('DD-MM-YYYY')}</Text>
            </View>
            <TouchableOpacity style={styles.calImage} onPress={() => {
              this.setState({
                fromDateVisible: true,
                toDate: true
              })
            }}>
              <Image source={require("./src/image/cal-icons.png")}
                style={{
                  height: 30,
                  width: 30
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.boxOuter, { height: 100, }]}>
            <TextInput
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              placeholder="Reason For Leave... "
              maxLength={200}
              multiline={true}
              style={{ paddingLeft: 15, paddingTop: 12, fontSize: 14 }}
            />
          </View>
          <View style={styles.buttonOuter}>
            <TouchableOpacity
              disabled={startDate || date && endDate || todate && text.length ? false : true}
              style={[styles.buttonInner, {
              }]}
              onPress={() => {
                this.setState({ modalVisible: true })
                console.log("Leave from ", this.state.startDate.format('DD-MM-YYYY') + "to", this.state.endDate.format('DD-MM-YYYY'))
              }}>
              <Text style={styles.buttonLabel}>
                Apply
            </Text>
            </TouchableOpacity>
            <Modal
              visible={this.state.modalVisible}
              transparent={true}
              onRequestClose={() => {
                this.setState({ modalVisible: false });
              }}
            >
              <ModalComponent
                diffDays={diffDays}
                onCloseModal={() => {
                  this.setState({
                    modalVisible: false,
                    startDate: null,
                    endDate: null,
                    text: ""
                  });
                }}
              />
            </Modal>

            <Modal
              visible={this.state.fromDateVisible}
              transparent={true}
              onRequestClose={() => {
                this.setState({ fromDateVisible: false });
              }}
            >
              <View style={{ flex: 1, marginTop: 50 }}>
                <Date
                  date={this.state.date}
                  onDatesChange={onDateChange}
                  isDateBlocked={isDateBlocked}
                />
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebedf6"
  },
  date: {
    marginTop: 50
  },
  focused: {
    color: 'blue'
  },
  fromDate: {
    fontSize: 16,
    marginLeft: 16

  },
  boxOuter: {
    flex: 1,
    height: 48,
    borderRadius: 4,
    marginTop: 32,
    flexDirection: "row",
    marginHorizontal: 34,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
  },
  dateBox: {
    flex: 1,
    justifyContent: "center",
  },
  calImage: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
    marginTop: 40
  },
  buttonInner: {
    flex: 1,
    width: "60%",
    borderRadius: 4,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e2c83",

  },
  buttonLabel: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500"
  },
  header: {
    backgroundColor: "#2e2c83",
    height: 60
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",

  },
});

AppRegistry.registerComponent('App', () => App);
