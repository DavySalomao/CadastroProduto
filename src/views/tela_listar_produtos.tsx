import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

interface Produto {
  id: string;  // Alterado de String para string
  nome: string;
  descricao: string;
  valor: string;
}

const TelaListarProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const busca_produtos = async () => {
      try {
        const lista_produtos = await AsyncStorage.getItem('produtos');
        if (lista_produtos) {
          setProdutos(JSON.parse(lista_produtos));
        }
      } catch (error) {
        console.log("Erro ao buscar lista", error);
      }
    }
    busca_produtos();
  }, []); // Adicionei um array vazio para garantir que o efeito seja executado apenas uma vez

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Produtos:</Text>
      <FlatList 
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.nome}>Nome:{item.nome}</Text>
            <Text>Descrição{item.descricao}</Text>
            <Text style={styles.valor}>Valor:{item.valor}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nome:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 14,
    color: 'green',
  },

});

export default TelaListarProdutos;
