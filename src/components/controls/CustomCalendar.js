import React from 'react';
import { Text, View } from 'react-native';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '.';
import { Calendar } from 'react-native-plain-calendar';
import { SCREEN_WIDTH } from '../../constants/Constants';

const CustomHeaderComponent = ({ onPressLeft, title, onPressRight, sort }) => {
  const customYear = (title) => {
    return title.substring(0, 4);
  };

  const customTitle = (title) => {
    if (title.replace(title.substring(0, 5), '') == 1) return 'יָנוּאָר';
    if (title.replace(title.substring(0, 5), '') == 2) return 'פֶבּרוּאָר';
    if (title.replace(title.substring(0, 5), '') == 3) return 'מַרס';
    if (title.replace(title.substring(0, 5), '') == 4) return 'אַפּרִיל';
    if (title.replace(title.substring(0, 5), '') == 5) return 'מַאִי';
    if (title.replace(title.substring(0, 5), '') == 6) return 'יוּנִי';
    if (title.replace(title.substring(0, 5), '') == 7) return 'יוּלִי';
    if (title.replace(title.substring(0, 5), '') == 8) return 'אוֹגוּסט';
    if (title.replace(title.substring(0, 5), '') == 9) return 'סֶפּטֶמבֶּר';
    if (title.replace(title.substring(0, 5), '') == 10) return 'אוֹקְטוֹבֶּר';
    if (title.replace(title.substring(0, 5), '') == 11) return 'נוֹבֶמבֶּר';
    if (title.replace(title.substring(0, 5), '') == 12) return 'דֵצֶמבֶּר';
  };

  return (
    <HorizontalLayout
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 18.29,
        paddingTop: 18,
        paddingBottom: 10,
      }}>
      <Button
        onPress={() => {
          sort();
        }}>
        <HorizontalLayout style={{ alignItems: 'center' }}>
          <Text style={{ color: '#000', fontSize: 16, lineHeight: 19 }}>סינון לפי</Text>
          <LocalImage
            source={require('src/assets/image/ic_sort_black.png')}
            style={{ width: 24, height: 24 }}
          />
        </HorizontalLayout>
      </Button>
      <HorizontalLayout style={{ alignItems: 'center' }}>
        <Button
          onPress={() => {
            onPressLeft();
          }}>
          <LocalImage
            source={require('src/assets/image/ic_left.png')}
            style={{ width: 9.17, height: 17.41, marginRight: 21.54 }}
          />
        </Button>
        <Text style={{ fontSize: 18, lineHeight: 22, width: 50, textAlign: 'left', color: '#000' }}>
          {customYear(title)}
        </Text>
        <Text style={{ fontSize: 18, lineHeight: 22, width: 70, color: '#000' }}>{customTitle(title)}</Text>
        <Button
          onPress={() => {
            onPressRight();
          }}>
          <LocalImage
            source={require('src/assets/image/ic_right.png')}
            style={{ width: 9.17, height: 17.41, marginLeft: 21.54 }}
          />
        </Button>
      </HorizontalLayout>
    </HorizontalLayout>
  );
};

const CustomDayComponent = ({
  isToday,
  isSelectedDate,
  isSingleSelectedDate,
  isStartSelectedDate,
  isEndSelectedDate,
  isIntermediateSelectedDate,
  isDisabledDate,
  isDisabledParticularDate,
  date,
  onPress,
}) => {
  return (
    <Button
      onPress={() => {
        !isDisabledDate && onPress();
      }}
      style={[
        {
          height: 26,
          marginVertical: 3,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        },
        isSingleSelectedDate && {
          width: 26,
          height: 26,
          borderRadius: 13,
          backgroundColor: '#5C9DF2',
        },
        isStartSelectedDate && {
          width: 26,
          height: 26,
          borderRadius: 13,
          backgroundColor: '#5C9DF2',
        },
        isEndSelectedDate && {
          width: 26,
          height: 26,
          borderRadius: 13,
          backgroundColor: '#5C9DF2',
        },
        !isSingleSelectedDate &&
          !isStartSelectedDate &&
          !isEndSelectedDate &&
          !isDisabledDate &&
          isSelectedDate && {
            width: (SCREEN_WIDTH - 38) / 7,
            height: 26,
            backgroundColor: 'rgba(30, 111, 217, 0.1)',
          },
      ]}>
      {(isStartSelectedDate || isEndSelectedDate) && (
        <>
          <LocalImage
            source={require('src/assets/image/ic_selected_date_start.png')}
            style={{ width: 12, height: 11, position: 'absolute', top: 7, left: -14 }}
          />
          <LocalImage
            source={require('src/assets/image/ic_selected_date_end.png')}
            style={{ width: 12, height: 11, position: 'absolute', top: 7, right: -14 }}
          />
        </>
      )}
      {isStartSelectedDate && (
        <View
          style={{
            position: 'absolute',
            right: -14,
            width: (SCREEN_WIDTH - 38) / 14,
            height: 26,
            backgroundColor: 'rgba(30, 111, 217, 0.1)',
            zIndex: -1,
          }}></View>
      )}
      {isEndSelectedDate && (
        <View
          style={{
            position: 'absolute',
            left: -14,
            width: (SCREEN_WIDTH - 38) / 14,
            height: 26,
            backgroundColor: 'rgba(30, 111, 217, 0.1)',
            zIndex: -1,
          }}></View>
      )}
      <Text
        style={[
          { textAlign: 'center', fontSize: 16, color: '#5C9DF2' },
          isToday && { color: 'red' },
          isSingleSelectedDate && { color: 'white' },
          isStartSelectedDate && { color: 'white' },
          isEndSelectedDate && { color: 'white' },
          isDisabledDate && { color: '#6F6F6F' },
        ]}>
        {date}
      </Text>
    </Button>
  );
};

export default class CustomCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Calendar.Picker
        style={[
          this.props.style,
          {
            backgroundColor: 'white',
            paddingBottom: 15,
            borderRadius: 11,
            elevation: 1,
          },
        ]}
        headerDateFormat="yyyy L"
        HeaderComponent={({ currentMonth, onPrevMonth, onNextMonth }) => (
          <CustomHeaderComponent
            onPressLeft={onPrevMonth}
            title={currentMonth}
            onPressRight={onNextMonth}
            sort={() => {
              this.props.sort();
            }}
          />
        )}
        weekdays={['ש', 'ו', 'ה', 'ד', 'ג', 'ב', 'א']}
        weekdayStyle={{
          fontSize: 16,
          lineHeight: 19,
          color: '#000',
          fontWeight: '700'
        }}
        dayContainerStyle={{ alignItems: 'center' }}
        selectedType={this.props.selectedType} //'single' | 'range' | 'single-range'
        disabledDates={[new Date('12/22/2022'), new Date('12/15/2022'), new Date('12/27/2022')]}
        dayDisabledStyle={{ color: '#6F6F6F' }}
        DayComponent={({
          isToday,
          isSelectedDate,
          isSingleSelectedDate,
          isStartSelectedDate,
          isEndSelectedDate,
          isIntermediateSelectedDate,
          isDisabledDate,
          isDisabledParticularDate,
          date,
          onPress,
        }) => (
          <CustomDayComponent
            isToday={isToday}
            isSelectedDate={isSelectedDate}
            isSingleSelectedDate={isSingleSelectedDate}
            isStartSelectedDate={isStartSelectedDate}
            isEndSelectedDate={isEndSelectedDate}
            isIntermediateSelectedDate={isIntermediateSelectedDate}
            isDisabledDate={isDisabledDate}
            isDisabledParticularDate={isDisabledParticularDate}
            date={date}
            onPress={onPress}
          />
        )}
        onSelected={(date) => {
          console.log(date);
        }}
      />
    );
  }
}
