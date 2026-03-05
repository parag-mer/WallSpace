import { StackScreenProps } from '@react-navigation/stack';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import Icon from '@react-native-vector-icons/octicons';
import { useRef, useState } from 'react';
import InfoModal from '../components/InfoModal';

type ViewerScreenProps = StackScreenProps<RootStackParamList, 'ViewerScreen'>;

const FOOTER_HEIGHT = 100;

export const ViewerScreen = ({ navigation, route }: ViewerScreenProps) => {
  const { imgData } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const toggleBars = () => {
    Animated.timing(headerAnim, {
      toValue: isVisible ? -headerHeight : 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    Animated.timing(footerAnim, {
      toValue: isVisible ? FOOTER_HEIGHT : 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    setIsVisible(!isVisible);
  };
  return (
    <>
      {/* header */}
      <Animated.View
        onLayout={e => {
          setHeaderHeight(e.nativeEvent.layout.height);
        }}
        style={{
          width: '100%',
          backgroundColor: imgData.avg_color,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
          paddingHorizontal: 20,
          paddingTop: Platform.OS === 'android' ? 40 : 50,
          transform: [{ translateY: headerAnim }],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          elevation: 10,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 30, color: 'white' }}>←</Text>
        </Pressable>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontSize: 20, color: 'white', fontWeight: '500' }}
          >
            {imgData.alt}
          </Text>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: '400' }}>
            Photo by {imgData.photographer} on Pexels
          </Text>
        </View>
        <Icon
          name="info"
          size={24}
          color={'white'}
          onPress={() => setModalVisible(true)}
        />
      </Animated.View>
      <Pressable onPress={toggleBars}>
        <Image
          source={{ uri: imgData.src.portrait }}
          style={{ width: '100%', height: '100%' }}
        />
      </Pressable>
      {/* footer */}
      <Animated.View
        style={{
          backgroundColor: imgData.avg_color,
          width: '100%',
          height: 100,
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 10,
          transform: [{ translateY: footerAnim }],
        }}
      >
        <View style={styles.bottomBtnStyle}>
          <Icon name="download" size={24} color={'white'} />
          <Text style={styles.bottomBtnText}>Save</Text>
        </View>
        <View style={styles.bottomBtnStyle}>
          <Icon name="heart" size={24} color={'white'} />
          <Text style={styles.bottomBtnText}>Favourite</Text>
        </View>
        <View style={styles.bottomBtnStyle}>
          <Icon name="image" size={24} color={'white'} />
          <Text style={styles.bottomBtnText}>Set</Text>
        </View>
      </Animated.View>
      <InfoModal
        visible={modalVisible}
        setVisible={setModalVisible}
        details={imgData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  boxWithShadow: {
    marginTop: 35,
    marginLeft: 20,
  },
  bottomBtnStyle: { alignItems: 'center', gap: 5 },
  bottomBtnText: {
    color: 'white',
    fontSize: 14,
  },
});
