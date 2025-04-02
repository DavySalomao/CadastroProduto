import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";

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
    <View>
      <Text>Lista de Produtos:</Text>
      <FlatList 
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Nome:{item.nome}</Text>
            <Text>Descrição{item.descricao}</Text>
            <Text>Valor:{item.valor}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default TelaListarProdutos;
