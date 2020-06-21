import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }
  render() {
    console.log("diff", this.props.diffDays)
    return (
      <View style={{
        flex: 1,
        justifyContent: "center"
      }}>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            flex: 1,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              marginHorizontal: "5%",
              borderRadius: 4,
              alignItems: "center",
              paddingVertical: 30,
              paddingHorizontal: 15,
              width: "90%",
              backgroundColor: "#ebedf6"
            }}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: "500"
            }} >
              {this.props.diffDays < 0 ? "Select Valid date" : " Request submit."}
            </Text>
            <TouchableOpacity
              style={{
                top: 0,
                right: 0,
                position: "absolute",
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                this.props.onCloseModal()
                // alert("working")
                // onCloseModal()
                // this.setState({ modalVisible: false })
              }}
            >
              <Image
                source={require("../image/cross.png")}
                height={12}
                width={12}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

}

export default ModalComponent;