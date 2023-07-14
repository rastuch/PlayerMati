/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import LiquidPlayer from 'liquid-player';
import RNFS from 'react-native-fs'


const App= () => {
  const isDarkMode = useColorScheme() === 'dark';
  const video = useRef();
  const [path,setPath] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
          <Header />
          <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
            <LiquidPlayer
                ref={video}
                style={{width: '100%', height: 400}}
                videoAspectRatio="16:9"
                onSnapshot={(e) => {
                  console.log(e.nativeEvent);
                  if(e.nativeEvent.isSuccess) {
                    setPath(e.nativeEvent.path);
                  }
                }
                }
                onError={(e) => console.log(e)}
                paused={false}
                source={{ uri: "rtsp://zephyr.rtsp.stream/movie?streamKey=0eb010a968a956a14b49101d43342bed"}}
            />
            <Button onPress={() => {
              video.current.snapshot(RNFS.DocumentDirectoryPath + '/obraz.png');
            }} title={"SnapShot!"} />
          </View>
          <Text>{path || 'nie ma patha'}</Text>
          {path !== null &&
              <Image source={{uri: 'file://' + path}} style={{width: '100%', height: 400}} />
          }
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;