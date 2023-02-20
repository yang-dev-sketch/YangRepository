import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import { API, SCREEN_WIDTH } from '../../constants/Constants';
import Timeline from 'react-native-timeline-flatlist';
import TaskItem from '../items/TaskItem';
import CustomCalendar from '../controls/CustomCalendar';

@observer
class TaskPopup extends React.Component {
  constructor(props) {
    super(props);
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.state = { selected: null };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onSort = () => {};

  onEventPress(data) {
    this.setState({ selected: data });
    this.props.onSelect(data);
  }

  renderSelected() {
    if (this.state.selected) return <Text>{this.state.selected.id}</Text>;
  }

  renderDetail(rowData, sectionID, rowID) {
    return <TaskItem data={rowData} index={sectionID} />;
  }

  render() {
    const data = this.props.data;

    return (
      <SwipeUpDownModal
        ContentModalStyle={styles.Modal}
        modalVisible={this.props.visible}
        onClose={() => {
          this.props.onCancel();
        }}
        ContentModal={
          <VerticalLayout style={{ height: '100%' }}>
            <View
              style={{ width: '100%', height: 23, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: 47,
                  height: 3,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  opacity: 0.2,
                }}></View>
            </View>
            <HorizontalLayout
              style={{
                paddingHorizontal: 20,
                alignItem: 'center',
                justifyContent: 'space-between',
                marginBottom: 16.94,
              }}>
              <Button
                onPress={() => {
                  this.props.onCancel();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 31, height: 31 }}
                />
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>
                משימות
              </Text>
            </HorizontalLayout>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <CustomCalendar style={{ marginBottom: 10 }} selectedType="single-range" sort={() => {}} />
              <SearchInput
                setSearch={(search) => {
                  this.props.setSearch(search);
                }}
              />
              <HorizontalLayout
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingHorizontal: 20,
                  marginTop: 15,
                  marginBottom: 16.25,
                }}>
                <Text style={{ fontSize: 18, lineHeight: 22, fontFamily: 'Danidin' }}>{this.renderSelected()} | 01</Text>
              </HorizontalLayout>
              <Timeline
                data={data}
                innerCircle="dot"
                circleSize={20}
                dotSize={12}
                dotColor="#1E6FD9"
                circleColor="#E2E2E2"
                lineWidth={2}
                lineColor="#1E6FD9"
                listViewContainerStyle={{ paddingTop: 40 }}
                timeContainerStyle={{ marginLeft: -50 }}
                timeStyle={{
                  position: 'absolute',
                  top: -25,
                  left: 8,
                  zIndex: 999,
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#6F6F6F',
                  backgroundColor: 'white',
                  height: 24.5,
                  textAlignVertical: 'center',
                }}
                eventDetailStyle={{
                  marginRight: 10,
                  marginTop: -40,
                  marginBottom: 40,
                }}
                columnFormat="single-column-right"
                onEventPress={this.onEventPress}
                renderDetail={this.renderDetail}
              />
            </ScrollView>
            <Button
              onPress={() => {}}
              style={{
                alignItems: 'center',
                position: 'absolute',
                bottom: 5,
                left: (SCREEN_WIDTH - 45) / 2,
              }}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 45, height: 45 }}
              />
            </Button>
          </VerticalLayout>
        }
        onClose={() => {
          this.props.onCancel();
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  Modal: {
    position: 'absolute',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '95%',
  },
});

export default TaskPopup;
