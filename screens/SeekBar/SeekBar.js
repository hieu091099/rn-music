import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Header, { HeaderDetail } from "./../../components/Header/Header";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
// import Slider from "react-native-slider";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const SeekBar = ({ item }) => {
  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(true);
  const [sound, setSound] = useState();

  const minutesAndSeconds = (position) => [
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
  ];
  const format = (time) => {
    return `${parseInt(time / 60)}:${
      time % 60 === 0 ? "00" : pad(time % 60, 2)
    }`;
  };
  // const elapsed = minutesAndSeconds(value);
  // const remaining = minutesAndSeconds(item.time - value);
  // console.log({ elapsed, remaining });

  const playPauseAudio = async () => {
    if (pause) {
      await sound.playAsync();
    } else {
      await sound.pauseAsync();
    }
  };
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: item.url,
      },
      { shouldPlay: true },
      (status) => {
        setValue(status.positionMillis);
      }
    );
    // console.log(sound);
    setSound(sound);
    setPause(false);
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
  }, []);

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
  const sliderChange = async (sliderValue) => {
    // await sound.playFromPositionAsync(sliderValue);
    // setValue(sliderValue);
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
            playPauseAudio();
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
          onPress={() => {
            playPauseAudio();
            setPause(true);
          }}
        >
          <Image
            source={require("../../assets/icon/ic_pause_white_48pt.png")}
          />
        </TouchableOpacity>
      );
    }
  };
  return (
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
        onValueChange={(sliderValue) => {
          sliderChange(sliderValue);
        }}
        maximumValue={item.time * 1000}
        minimumTrackTintColor="white"
        maximumTrackTintColor="white"
        thumbTintColor="white"
        onSlidingComplete={async (sliderValue) => {
          await sound.playFromPositionAsync(sliderValue);
          setValue(sliderValue);
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Text style={{ color: "white" }}>
            {format(parseInt(value / 1000))}
          </Text>
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
          <Image source={require("../../assets/icon/ic_shuffle_white.png")} />
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
          <Image source={require("../../assets/icon/ic_repeat_white.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({});
