import React from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default function Calender() {
  return (
    <View>
      <Text>test calender</Text>
      <Calendar
        current={Date()}
        onDayPress={(day) => {}}
        onDayLongPress={(day) => {}}
        monthFormat={'MMM yyyy'}
        onMonthChange={(month) => {}}
        hideArrows={false}
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={0}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={false}
        renderHeader={(date) => {}}
        enableSwipeMonths={true}
      />
    </View>
  );
}
