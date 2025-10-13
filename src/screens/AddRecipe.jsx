import {
  Camera,
  Images,
  LibraryBig,
  MapPin,
  Settings,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

const AddRecipe = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [selectedType, setSelectedType] = useState('Post'); // default Feed

  //   const pickImage = async () => {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       quality: 0.7,
  //     });

  //     if (!result.canceled) {
  //       setImage(result.assets[0].uri);
  //     }
  //   };

  return (
    <View style={styles.container}>
      {/* Input area */}
      <View style={styles.inputSection}>
        <TextInput
          placeholder="What new recipe are there today?"
          multiline
          value={text}
          onChangeText={setText}
          style={styles.textInput}
          textAlignVertical="top"
        />
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.addImageBtn}>
            <Images size={20} color="#000" opacity={0.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addImageBtn}>
            <Camera size={20} color="#000" opacity={0.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addImageBtn}>
            <MapPin size={20} color="#000" opacity={0.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addImageBtn}>
            <LibraryBig size={20} color="#000" opacity={0.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addImageBtn}>
            <Settings size={20} color="#000" opacity={0.8} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        {['Post', 'Reels'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.pill, selectedType === item && styles.pillActive]}
            onPress={() => setSelectedType(item)}
          >
            <Text
              style={[
                styles.pillText,
                selectedType === item && styles.pillTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-between',
  },
  inputSection: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#fbfbfbff',
    borderRadius: 12,
    minHeight: 150,
    maxHeight: 500,
  },
  addImageBtn: {
    marginTop: 12,
    padding: 10,
    alignSelf: 'flex-start',
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  addImageText: {
    fontSize: 14,
    color: '#333',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  pillActive: {
    backgroundColor: '#000',
  },
  pillText: {
    color: '#333',
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#fff',
  },
});
