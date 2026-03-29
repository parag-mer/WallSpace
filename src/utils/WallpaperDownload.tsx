import { PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const WALLSPACE_DIR = `${RNFS.PicturesDirectoryPath}/WallSpace`;

const createFolderIfNotExists = async () => {
  const exists = await RNFS.exists(WALLSPACE_DIR);

  if (!exists) {
    await RNFS.mkdir(WALLSPACE_DIR);
  }
};

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  }
  return true;
};

export const downloadWallpaperAndroid = async ({
  url,
  onComplete,
  onError,
  onProgress,
}: {
  url: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onError?: () => void;
}) => {
  try {
    const hasPermission = await requestPermission();
    console.log('Permission granted: ', hasPermission);
    if (!hasPermission) return;

    await createFolderIfNotExists();

    const fileName = `wall_${Date.now()}.jpg`;
    const filePath = `${WALLSPACE_DIR}/${fileName}`;

    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      progress: res => {
        const progress = res.bytesWritten / res.contentLength;
        onProgress?.(progress);
      },
      progressDivider: 1,
    }).promise;

    if (result.statusCode === 200) {
      await CameraRoll.saveAsset(filePath, { type: 'photo' });
      onComplete?.();
    } else {
      onError?.();
    }
  } catch (error) {
    onError?.();
  }
};

export const downloadWallpaperIOS = async (url: string) => {
  try {
    const fileName = `wall_${Date.now()}.jpg`;
    const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
    }).promise;

    if (result.statusCode === 200) {
      const savedUrl = await CameraRoll.saveAsset(filePath, {
        type: 'photo',
        album: 'WallSpace',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
