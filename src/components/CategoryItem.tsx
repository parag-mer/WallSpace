import { Text, ImageBackground, Pressable } from 'react-native';
import React from 'react';

const CategoryItem = ({
  imgUrl,
  label,
  onPress,
}: {
  label: string;
  imgUrl: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && { opacity: 0.8 }}
    >
      <ImageBackground
        source={{ uri: imgUrl }}
        resizeMode="cover"
        style={{
          height: 150,
          marginBottom: 16,
          opacity: 0.6,
          borderRadius: 16,
          overflow: 'hidden',
        }}
      />
      <Text
        style={{
          position: 'absolute',
          color: '#fff',
          fontSize: 32,
          fontWeight: '600',
          textAlign: 'center',
          left: 0,
          right: 0,
          top: 50,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CategoryItem;
