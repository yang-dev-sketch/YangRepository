import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import { API, SCREEN_HEIGHT } from '../../constants/Constants';
import TotalItem from '../items/TotalItem';
import Timeline from 'react-native-timeline-flatlist';
import LeadItem from '../items/LeadItem';

@observer
class LeadPopup extends React.Component {
  constructor(props) {
    super(props);
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.state = {
      selected: null,
      data: [
        {
          time: '08:00',
          name: 'שם הליד',
          avatar: '',
          type: 'fail',
          phone: '052 - 000000000',
          gmail: 'nastya1106@gmail.com',
          createdAt: '13:34, 11.06.2022',
          updatedAt: '14.08.2022',
        },
        {
          time: '09:00',
          name: 'שם הליד',
          avatar: '',
          type: 'treatment',
          phone: '052 - 000000000',
          gmail: 'nastya1106@gmail.com',
          createdAt: '13:34, 11.06.2022',
          updatedAt: '14.08.2022',
        },
        {
          time: '10:00',
          name: 'שם הליד',
          avatar: '',
          type: 'noreply',
          phone: '052 - 000000000',
          gmail: 'nastya1106@gmail.com',
          createdAt: '13:34, 11.06.2022',
          updatedAt: '14.08.2022',
        },
      ],
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onSort = () => {};

  onSave = () => {};

  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderSelected() {
    if (this.state.selected) return <Text>{this.state.selected.time}</Text>;
  }

  renderDetail(rowData, sectionID, rowID) {
    return <LeadItem data={rowData} />;
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
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>לידים</Text>
            </HorizontalLayout>
            <HorizontalLayout style={{ justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <TotalItem amount={94} text="לידים נרשמו" color="#43C7FF"></TotalItem>
              <TotalItem amount={5} text="נרשמו היום" color="#0D65D9"></TotalItem>
            </HorizontalLayout>
            <HorizontalLayout
              style={{
                marginVertical: 15,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <TotalItem amount={12} text="אחוז המרה ללקוחות" color="#4399FF"></TotalItem>
              <TotalItem amount={4} text="תזכורות לידים" color="#4E0DD9"></TotalItem>
            </HorizontalLayout>
            <View style={{ paddingHorizontal: 20 }}>
              <SearchInput
                setSearch={(search) => {
                  this.props.setSearch(search);
                }}
              />
            </View>
            <HorizontalLayout
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginTop: 15,
                marginBottom: 16.25,
              }}>
              <Button
                onPress={() => {
                  this.onSort();
                }}>
                <HorizontalLayout>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 19,
                      color: '#5C9DF2',
                      textDecorationLine: 'underline',
                    }}>
                    סינון
                  </Text>
                  <LocalImage
                    source={require('src/assets/image/ic_sort.png')}
                    style={{ width: 21, height: 21 }}
                  />
                </HorizontalLayout>
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22, fontFamily: 'Danidin' }}>{this.renderSelected()}</Text>
            </HorizontalLayout>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <Timeline
                data={this.state.data}
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
              onPress={() => {
                this.props.addBranch();
              }}
              style={{ alignItems: 'center' }}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 45, height: 45, marginBottom: 15 }}
              />
            </Button>
            <View style={{ paddingHorizontal: 20 }}>
              <ActiveButton
                text="שמירה"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.onSave();
                }}
              />
            </View>
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 0.95
  },
});

export default LeadPopup;
