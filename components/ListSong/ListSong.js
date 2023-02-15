import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const ListSong = ({ listSong }) => {
  const navigation = useNavigation();
  const renderSongs = () => {
    return listSong.map((item, index) => {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: "black",
                borderRadius: 50,
                marginRight: 40,
              }}
              onPress={() => {
                navigation.navigate("Player", { item });
              }}
            >
              <Icon name="caretright" color="white" />
            </TouchableOpacity>
            <View>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {item.nameSong}
              </Text>
              <Text
                style={{ color: "#84868a", fontWeight: "bold", fontSize: 14 }}
              >
                {item.stream.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
          </View>
          <View>
            <Icon
              name="ellipsis1"
              color="white"
              size={24}
              style={{ transform: [{ rotate: "90deg" }] }}
            />
          </View>
        </View>
      );
    });
  };
  return (
    <View style={{ marginTop: 50, alignItems: "center" }}>
      <View style={{ width: "80%" }}>{renderSongs()}</View>
    </View>
  );
};

export default ListSong;
