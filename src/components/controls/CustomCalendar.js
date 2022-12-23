import React from 'react';
import { Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '.';

LocaleConfig.locales['hebrew'] = {
  monthNames: [
    'יָנוּאָר',
    'פֶבּרוּאָר',
    'מַרס',
    'אַפּרִיל',
    'מַאִי',
    'יוּנִי',
    'יוּלִי',
    'אוֹגוּסט',
    'סֶפּטֶמבֶּר',
    'אוֹקְטוֹבֶּר',
    'נוֹבֶמבֶּר',
    'דֵצֶמבֶּר',
  ],
  dayNames: ['א', 'ש', 'ו', 'ה', 'ד', 'ג', 'ב'],
  dayNamesShort: ['א', 'ש', 'ו', 'ה', 'ד', 'ג', 'ב'],
  today: 'הַיוֹם',
};
LocaleConfig.defaultLocale = 'hebrew';

export default class CustomCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }

  setSelectedDate = (value) => {
    this.setState({ selectedDate: value });
  };

  render() {
    return (
      <Calendar
        style={this.props.style}
        markingType={'period'}
        markedDates={{
          '2022-12-21': { startingDay: true, color: '#50cebb', textColor: 'white' },
          '2022-12-22': { color: '#70d7c7', textColor: 'white' },
          '2022-12-23': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
          '2022-12-24': { color: '#70d7c7', textColor: 'white' },
          '2022-12-25': { endingDay: true, color: '#50cebb', textColor: 'white' },
        }}
        initialDate={this.state.selectedDate}
        minDate={'2021-12-16'}
        maxDate={'2022-12-30'}
        dayComponent={({ date, state }) => {
          return (
            <Button
              onPress={() => {
                this.setSelectedDate(date);
              }}
              style={[
                {
                  width: 26,
                  height: 26,
                },
                state === 'selected' && {
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: '#5C9DF2',
                  justifyContent: 'center',
                },
              ]}>
              <Text
                style={[
                  { textAlign: 'center', fontSize: 16, color: '#1E6FD9' },
                  state === 'today' && { color: 'red' },
                  state === 'selected' && { color: 'white' },
                  state === 'disabled' && { color: '#6F6F6F' },
                  state === 'inactive' && { color: 'red' },
                ]}>
                {date.day}
              </Text>
            </Button>
          );
        }}
        renderArrow={(direction) =>
          direction === 'left' ? (
            <LocalImage
              source={require('src/assets/image/ic_left.png')}
              style={{ width: 9.17, height: 17.41 }}
            />
          ) : (
            <LocalImage
              source={require('src/assets/image/ic_right.png')}
              style={{ width: 9.17, height: 17.41 }}
            />
          )
        }
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        customHeader={(direction) => {
          return (
            <VerticalLayout>
              <HorizontalLayout
                style={{ alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>
                <Button onPress={() => {}}>
                  <HorizontalLayout style={{ alignItems: 'center' }}>
                    <Text>סינון לפי</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_sort_black.png')}
                      style={{ width: 24, height: 24 }}
                    />
                  </HorizontalLayout>
                </Button>
                <HorizontalLayout style={{ alignItems: 'center' }}>
                  <Button onPress={() => {}}>
                    <LocalImage
                      source={require('src/assets/image/ic_left.png')}
                      style={{ width: 9.17, height: 17.41, marginRight: 21.54 }}
                    />
                  </Button>
                  <Text style={{ fontSize: 18, lineHeight: 22 }}>ספטמבר 2022</Text>
                  <Button onPress={() => {}}>
                    <LocalImage
                      source={require('src/assets/image/ic_right.png')}
                      style={{ width: 9.17, height: 17.41, marginLeft: 21.54 }}
                    />
                  </Button>
                </HorizontalLayout>
              </HorizontalLayout>
              <HorizontalLayout
                style={{ alignItems: 'center', justifyContent: 'space-around', marginBottom: 10 }}>
                <Text>ש</Text>
                <Text>ו</Text>
                <Text>ה</Text>
                <Text>ד</Text>
                <Text>ג</Text>
                <Text>ב</Text>
                <Text>א</Text>
              </HorizontalLayout>
            </VerticalLayout>
          );
        }}
        enableSwipeMonths={true}
      />
    );
  }
}
