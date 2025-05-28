import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {SortType} from '../utils/todoUtils';

interface Props {
  sort: SortType;
  setSort: (s: SortType) => void;
}

const options: {label: string; value: SortType}[] = [
  {label: 'Most Recent', value: 'recent'},
  {label: 'By ID', value: 'id'},
];

const SortBar: React.FC<Props> = ({sort, setSort}) => (
  <View style={styles.container}>
    {options.map(opt => (
      <TouchableOpacity
        key={opt.value}
        style={[styles.button, sort === opt.value && styles.selected]}
        onPress={() => setSort(opt.value)}>
        <Text style={{color: sort === opt.value ? '#fff' : '#000'}}>{opt.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'center', marginBottom: 8},
  button: {padding: 8, marginHorizontal: 4, borderRadius: 6, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000'},
  selected: {backgroundColor: '#000'},
});

export default SortBar;