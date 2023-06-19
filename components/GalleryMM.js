import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, TextInput, StyleSheet, ScrollView } from 'react-native';

const Gallery = () => {
  const [images, setImages] = useState([
    { src: 'https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg', name: 'sky' },
    { src: 'https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg', name: 'another sky' },
    { src: 'https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg', name: 'yeah, another one' },
    { src: 'https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg', name: 'wow...' },
    { src: 'https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg', name: 'i tired' },
    { src: 'https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg', name: 'really' },
    { src: 'https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg', name: 'pls stop!' }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');

  const handleLongPress = (index) => {
    const selected = images[index];
    setSelectedImage(selected);

    Alert.alert(
      'Чё делать будешь',
      '',
      [
        { text: 'Снести', onPress: () => deleteImage(index) },
        { text: 'Переименовать', onPress: () => setIsRenaming(true) },
        { text: 'Отмена', style: 'cancel' }
      ]
    );
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setSelectedImage(null);
  };

  const renameImage = () => {
    if (newName !== '') {
      const updatedImages = [...images];
      const selected = { ...selectedImage, name: newName };
      updatedImages.splice(updatedImages.indexOf(selectedImage), 1, selected);
      setImages(updatedImages);
    } else if(newName === ''){
      alert("Enter new name!")
    }
    setSelectedImage(null);
    setIsRenaming(false);
    setNewName('');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onLongPress={() => handleLongPress(index)}>
            <Image source={{uri: image.src}} style={styles.image} />
            <Text style={styles.name}>{image.name}</Text>
          </TouchableOpacity>
        ))}

        {isRenaming && selectedImage && (
          <View style={styles.renameContainer}>
            <TextInput
              value={newName}
              onChangeText={(text) => setNewName(text)}
              style={styles.renameInput}
              placeholder="Enter new name"
              autoFocus={true}
            />
            <TouchableOpacity onPress={renameImage} style={styles.renameButton}>
              <Text style={styles.renameButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  renameContainer: {
    marginTop: 20,
  },
  renameInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  renameButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renameButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Gallery;