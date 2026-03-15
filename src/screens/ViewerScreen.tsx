import { StackScreenProps } from '@react-navigation/stack';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';
import { useRef, useState } from 'react';
import InfoModal from '../components/InfoModal';
import { RootStackParamList } from '../navigation/RootNav';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, RemoveFromFav } from '../store/slices/FavWallpaper';
import { IStore } from '../store';
import FavBtn from '../components/FavBtn';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ZoomableImage } from '../components/ZoomableImage';

type ViewerScreenProps = StackScreenProps<RootStackParamList, 'ViewerScreen'>;

const FOOTER_HEIGHT = 150;

export const ViewerScreen = ({ navigation, route }: ViewerScreenProps) => {
  const insets = useSafeAreaInsets();
  const { imgData } = route.params;
  const dispatch = useDispatch();
  const isFav = useSelector((state: IStore) =>
    state.FavWallpaperReducer.wallpaperList.some(
      photo => photo.id === imgData.id,
    ),
  );
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
    <SafeAreaView style={{ flex: 1 }}>
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
          paddingTop: insets.top,
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

      <Pressable
        onPress={toggleBars}
        style={{ flex: 1, backgroundColor: 'black' }}
      >
        <Image
          source={{ uri: imgData.src.tiny }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={10}
        />
        <ZoomableImage uri={imgData.src.large2x} />
      </Pressable>

      {/* footer */}
      <Animated.View
        style={{
          backgroundColor: imgData.avg_color,
          width: '100%',
          paddingTop: 20,
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: insets.bottom + 10,
          transform: [{ translateY: footerAnim }],
        }}
      >
        <Pressable style={styles.bottomBtnStyle}>
          <Icon name="download" size={24} color={'white'} />
          <Text style={styles.bottomBtnText}>Save</Text>
        </Pressable>
        <FavBtn
          isFav={isFav}
          onPress={() =>
            isFav
              ? dispatch(RemoveFromFav(imgData.id))
              : dispatch(addToFav(imgData))
          }
        />
        <Pressable style={styles.bottomBtnStyle}>
          <Icon name="image" size={24} color={'white'} />
          <Text style={styles.bottomBtnText}>Set</Text>
        </Pressable>
      </Animated.View>
      <InfoModal
        visible={modalVisible}
        setVisible={setModalVisible}
        details={imgData}
      />
    </SafeAreaView>
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
