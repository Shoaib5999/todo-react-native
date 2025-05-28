import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {TodoItem as TodoItemType, updateTodo, deleteTodo} from '../store/todoSlice';

interface Props {
  todo: TodoItemType;
}

const TodoItem: React.FC<Props> = ({todo}) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(updateTodo({
      ...todo,
      completed: !todo.completed,
      updated_at: new Date().toISOString(),
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={handleToggle} style={styles.checkbox}>
        <Text style={{color: todo.completed ? '#fff' : '#000'}}>
          {todo.completed ? '✔' : ''}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.title, todo.completed && styles.completed]}>{todo.title}</Text>
      <TouchableOpacity onPress={handleDelete} style={styles.delete}>
        <Text style={{color: '#fff'}}>Del</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {flexDirection: 'row', alignItems: 'center', padding: 8, borderBottomWidth: 1, borderColor: '#eee'},
  checkbox: {width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#000', alignItems: 'center', justifyContent: 'center', marginRight: 12, backgroundColor: '#000'},
  title: {flex: 1, color: '#000', fontSize: 16},
  completed: {textDecorationLine: 'line-through', color: '#888'},
  delete: {backgroundColor: '#000', padding: 6, borderRadius: 6, marginLeft: 8},
});

export default TodoItem;