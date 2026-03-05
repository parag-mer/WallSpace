import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Icon from '@react-native-vector-icons/octicons';

export const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  return (
    <View style={styles.unfocusedTab}>
      <Icon
        name={icon}
        color={focused ? '#fff' : '#666666'}
        size={focused ? 30 : 20}
      />
      {/* {focused && <Text style={styles.focusedText}>{title}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  focusedTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 88,
    height: 64,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#fff',
    marginTop: 24,
  },
  unfocusedTab: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  icon: {
    width: 24,
    height: 24,
  },
  focusedText: {
    color: '#151312',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
