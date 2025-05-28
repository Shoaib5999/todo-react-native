import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FilterType} from '../utils/todoUtils';

interface Props {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
}

const options: FilterType[] = ['all', 'active', 'done'];

const FilterBar: React.FC<Props> = ({filter, setFilter}) => (
  <View style={styles.container}>
    {options.map(opt => (
      <TouchableOpacity
        key={opt}
        style={[styles.button, filter === opt && styles.selected]}
        onPress={() => setFilter(opt)}>
        <Text style={{color: filter === opt ? '#fff' : '#000'}}>{opt.toUpperCase()}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'center', marginVertical: 8},
  button: {padding: 8, marginHorizontal: 4, borderRadius: 6, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000'},
  selected: {backgroundColor: '#000'},
});

export default FilterBar;