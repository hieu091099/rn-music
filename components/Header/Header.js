import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Header = () => {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 20,
        position: "absolute",
        zIndex: 100,
        top: 10,
        left: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: windowWidth - 40,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "black", borderRadius: 100, padding: 5 }}
        >
          <Icon name="left" color="white" size={15} />
        </TouchableOpacity>
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>Artist</Text>
        </View>
        <TouchableOpacity>
          <Icon name="heart" color="#00be48" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const HeaderDetail = ({ name }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 20,
        position: "absolute",
        zIndex: 100,
        top: 10,
        left: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: windowWidth - 40,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "black", borderRadius: 100, padding: 5 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="down" color="white" size={15} />
        </TouchableOpacity>
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>{name}</Text>
        </View>
        <TouchableOpacity>
          <Icon
            name="ellipsis1"
            color="white"
            size={24}
            style={{ transform: [{ rotate: "90deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;
