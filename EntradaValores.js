import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EntradaValores = ({ nome, setNome, buscarNomeApi }) => {
  return (
    <View>
      <Text style={styles.titulo}>Busca de drinks por nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe aqui o drink que deseja saber os ingredientes"
        value={nome}
        onChangeText={text => setNome(text)}
        keyboardType="default"
      />
      <Button
        title="Buscar ingredientes"
        onPress={buscarNomeApi}
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    marginBottom: 15, 
    textAlign: 'center'
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  }
});

export default EntradaValores;
