import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ModalComponent = ({ diffDays, onCloseModal }) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.content} >
        <View style={styles.modal} >
          <Text style={styles.title} >
            {diffDays < 0 ? "Select Valid date" : " Request submit."}
          </Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              onCloseModal()
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center"
  },
  modal: {
    marginHorizontal: "5%",
    borderRadius: 4,
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 15,
    width: "90%",
    backgroundColor: "#ebedf6"
  },
  title: {
    fontSize: 16,
    fontWeight: "500"
  },
  close: {
    top: 0,
    right: 0,
    position: "absolute",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default ModalComponent;