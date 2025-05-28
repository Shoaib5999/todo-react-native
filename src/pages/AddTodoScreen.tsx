import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTodo} from '../store/todoSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Define the navigation stack param list
export type RootStackParamList = {
  Main: undefined;
  AddTodo: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddTodo'>;

const AddTodoScreen: React.FC<Props> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required.');
      return;
    }
    dispatch(
      addTodo({
        id: Date.now(),
        title,
        description: description,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter TODO title"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, {height: 80}]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description (optional)"
        placeholderTextColor="#888"
        multiline
      />
      <Button title="Add TODO" onPress={handleAdd} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
});

export default AddTodoScreen;
