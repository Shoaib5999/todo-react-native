import React, {useEffect, useState, useMemo} from 'react';
import {View, Text, FlatList, Button, ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setTodos} from '../store/todoSlice';
import {fetchTodos} from '../services/todoService';
import TodoItem from '../components/TodoItem';
import FilterBar from '../components/FilterBar';
import SortBar from '../components/SortBar';
import {sortTodos, filterTodos, SortType, FilterType} from '../utils/todoUtils';

const MainScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<SortType>('recent');
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    setLoading(true);
    fetchTodos().then(data => {
      dispatch(setTodos(data));
      setLoading(false);
    });
  }, [dispatch]);

  const filteredSortedTodos = useMemo(() => {
    return sortTodos(filterTodos(todos, filter), sort);
  }, [todos, sort, filter]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TODO List</Text>
        <Button title="Add" onPress={() => navigation.navigate('AddTodo')} />
      </View>
      <FilterBar filter={filter} setFilter={setFilter} />
      <SortBar sort={sort} setSort={setSort} />
      <Text style={styles.counts}>
        Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
      </Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredSortedTodos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <TodoItem todo={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  title: {fontSize: 24, fontWeight: 'bold', color: '#000'},
  counts: {marginVertical: 8, color: '#000'},
});

export default MainScreen;
