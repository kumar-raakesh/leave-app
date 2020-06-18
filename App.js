/**
 * Sample React Native App
 * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */


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
  View
} from 'react-native';
// import Dates from 'react-native-dates';
import moment from 'moment';
import Date from "./src/Date"

export default class App extends Component {
  state = {
    date: null,
    focus: 'startDate',
    startDate: null,
    endDate: null
  }

  render() {
    const isDateBlocked = (date) =>
      date.isBefore(moment(), 'day');

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    const onDateChange = ({ date }) =>
      this.setState({ ...this.state, date });

    return (
      <View style={styles.container}>
        <Date
          onDatesChange={onDatesChange}
          isDateBlocked={isDateBlocked}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focus}
          // focusedMonth={moment('05/09/2030', 'DD/MM/YYYY')}
          range
        />

        {/* <Date
          date={this.state.date}
          onDatesChange={onDateChange}
          isDateBlocked={isDateBlocked}
        /> */}

        {this.state.date && <Text style={styles.date}>{this.state.date && this.state.date.format('LL')}</Text>}
        <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format('LL')}</Text>
        <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format('LL')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 50
  },
  date: {
    marginTop: 150
  },
  focused: {
    color: 'blue'
  }
});

AppRegistry.registerComponent('App', () => App);


























// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
