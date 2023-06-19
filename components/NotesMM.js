import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NotesApp = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');

    const handleAddNote = () => {
        if (currentNote !== '') {
            setNotes([...notes, currentNote]);
            setCurrentNote('');
        }
    };

    const handleDeleteNote = index => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Заметки</Text>

            <TextInput
                style={styles.input}
                placeholder="Введите заметку"
                value={currentNote}
                onChangeText={text => setCurrentNote(text)}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
                <Text style={styles.buttonText}>Добавить</Text>
            </TouchableOpacity>

            <View style={styles.notesContainer}>
                {notes.map((note, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.noteItem}
                        onLongPress={() => handleDeleteNote(index)}
                    >
                        <Text>{note}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    notesContainer: {
        flex: 1,
    },
    noteItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
});

export default NotesApp;