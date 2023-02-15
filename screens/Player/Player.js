import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header, { HeaderDetail } from "./../../components/Header/Header";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
// import Slider from "react-native-slider";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Player = ({ route }) => {
  const { item } = route.params;
  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(true);
  const [sound, setSound] = useState();

  const pad = (n, width, z = 0) => {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };
  const minutesAndSeconds = (position) => [
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
  ];
  const elapsed = minutesAndSeconds(value);
  const remaining = minutesAndSeconds(item.time - value);
  // console.log({ elapsed, remaining });
  const format = (time) => {
    return `${parseInt(time / 60)}:${
      time % 60 === 0 ? "00" : pad(time % 60, 2)
    }`;
  };
  format(item.time);
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: item.url,
      },
      { shouldPlay: true }
    );
    setSound(sound);
    // console.log(JSON.stringify(sound));
    console.log("Playing Sound");
    await sound.setPositionAsync(0);
    await sound.playAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const image = {
    uri: item.image.toString(),
  };
  const renderPlayButton = () => {
    if (pause) {
      return (
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            backgroundColor: "#00be48",
            borderRadius: 50,
          }}
          onPress={() => {
            playSound();
            setPause(false);
          }}
        >
          <Image
            source={require("../../assets/icon/ic_play_arrow_white_48pt.png")}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            backgroundColor: "#00be48",
            borderRadius: "50%",
          }}
          onPress={() => setPause(true)}
        >
          <Image
            source={require("../../assets/icon/ic_pause_white_48pt.png")}
          />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={{ backgroundColor: "#272c2f", width: "100%", height: "100%" }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{
          position: "relative",
          height: windowHeight,
        }}
      >
        <HeaderDetail name={item.nameSong} />
        <View
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: "black",
            width: "100%",
            height: windowHeight,
            opacity: 0.3,
          }}
        />
        <LinearGradient
          colors={["#00000000", "black"]}
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: windowWidth - 30,
              position: "absolute",
              bottom: 50,
            }}
          >
            <Slider
              value={value}
              minimumValue={0}
              step={1}
              onValueChange={(sliderValue) => setValue(sliderValue)}
              maximumValue={item.time}
              minimumTrackTintColor="white"
              maximumTrackTintColor="white"
              thumbTintColor="white"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
              }}
            >
              <View>
                <Text style={{ color: "white" }}>{format(value)}</Text>
              </View>
              <View>
                <Text style={{ color: "white" }}>{format(item.time)}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={require("../../assets/icon/ic_shuffle_white.png")}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/icon/ic_skip_previous_white_36pt.png")}
                  />
                </TouchableOpacity>
                {renderPlayButton()}
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/icon/ic_skip_next_white_36pt.png")}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/icon/ic_repeat_white.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({});
