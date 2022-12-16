import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Langs, Colors, Dimens, FontFamily, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import { BranchItem } from '../items';
import { requestPost } from '../../utils/ApiUtils';
import { API } from '../../constants/Constants';
import TotalItem from '../items/TotalItem';
import Timeline from 'react-native-timeline-flatlist';
import LeadItem from '../items/LeadItem';
import TrainingItem from '../items/TrainingItem';

@observer
class CloseTrainPopup extends React.Component {
  constructor(props) {
    super(props);
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.data = [
      {
        type: 'אימון אישי ',
        time: '08:00',
        min: '45',
        timeArea: '08:00 - 08:45',
        name: 'שם הליד',
        participants: '10/12',
      },
      {
        type: 'אימון אישי ',
        time: '09:00',
        min: '45',
        timeArea: '08:00 - 08:45',
        name: 'שם הליד',
        participants: '10/12',
      },
      {
        type: 'אימון אישי ',
        time: '10:00',
        min: '45',
        timeArea: '08:00 - 08:45',
        name: 'שם הליד',
        participants: '10/12',
      },
    ];
    this.state = { selected: null };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderSelected() {
    if (this.state.selected) return <Text>{this.state.selected.time}</Text>;
  }

  renderDetail(rowData, sectionID, rowID) {
    return <TrainingItem data={rowData} even={sectionID % 2 === 0} />;
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>אימונים קרובים</Text>
            </HorizontalLayout>
            <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
              <SearchInput
                setSearch={(search) => {
                  this.props.setSearch(search);
                }}
              />
            </View>
            <HorizontalLayout
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingHorizontal: 20,
                marginBottom: 16.25,
              }}>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>{this.renderSelected()}</Text>
            </HorizontalLayout>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <Timeline
                style={styles.list}
                data={this.data}
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
    height: '80%',
  },
});

export default CloseTrainPopup;
