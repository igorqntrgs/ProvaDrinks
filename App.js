import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import EntradaValores from './EntradaValores';

const App = () => {
  const [nome, setnome] = useState('');
  const [resultado, setResultado] = useState(false);
  const [error, setError] = useState('');
  const [drinks, setDrinks] = useState([]);

  const setInformacao = (json, nome) => {
    const lista= [];
    json.forEach((element) => {
      if (element.strDrink.includes(nome)){
        const drinkName = element.strDrink;
        const ingredients = [];

        for (let i = 1; i <= 15; i++) { 
          const ingredientKey = 'strIngredient' + i;
          if (element.hasOwnProperty(ingredientKey) && element[ingredientKey]) {
              ingredients.push(element[ingredientKey]);
          } else {
              break;
          }
      }

      if (!informacoesPorBebida.hasOwnProperty(drinkName)) {
        informacoesPorBebida[drinkName] = [];
      }

      informacoesPorBebida[drinkName].push(ingredients);

    }});

    console.log(informacoesPorBebida);
    return informacoesPorBebida;
    setDrinks(lista);
};
    
  

  const buscarnomeApi = () => {
    axios.get(`http://10.136.63.142:3000/drinks`)
      .then((resposta) => {
        if (resposta.data && nome) {
          setInformacao(resposta.data, nome);
          setResultado(true);
          setError('');
        } else {
          setResultado(false);
          setError('Insira um nome válido para procurar os ingredientes do drink');
        }
      })
      .catch((error) => {
        setResultado(false);
        setError('Erro ao buscar os ingredientes. Verifique sua conexão.');
      });
  };

  return (
    <View style={styles.container}>
      <EntradaValores
        nome={nome}
        setnome={setnome}
        buscarnomeApi={buscarnomeApi}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {resultado ? (
        drinks && drinks.length > 0 ? (
          <FlatList style={{ marginTop: 15 }}
            data={drinks}
            renderItem={({ item }) => (
              <Text style={{ fontSize: 14 }}>{item}</Text>
            )}
          />
        ) : (
          <Text style={styles.naoEncontrado}>Nenhum drink encontrado com esse nome</Text>
        )
      ) : null}

    </View>
  );
 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 120
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold'
  },
  naoEncontrado: {
    marginTop: 10,
    fontWeight: 'bold'
  }
});

export default App;
