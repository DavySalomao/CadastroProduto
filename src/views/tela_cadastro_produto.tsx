import React from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import {useForm, Controller} from "react-hook-form"
import AsyncStorage from "@react-native-async-storage/async-storage";
// Utiliza o local storage para manipular os dados

//Como fosse uma MODEL
interface Produto {
  nome: string;
  descricao: string;
  valor: string;
}

const Tela_cadastro_produto: React.FC = () => {
const{
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<Produto>();

  // dados vai renomear dentro da funcao o obj Produto
  const enviar = async(dados: Produto)=>{
    try {
    const produtos_existe = await AsyncStorage.getItem("produtos"); // Espera a busca no banco de dados
    const produtos = produtos_existe ? JSON.parse(produtos_existe) : [];

    /*  let produtos
        if (produto_existe) {
        produtos = JSON.parse(produto_existe);
    }
    */

    //...dados -> trás as informações dos dados do formulário em novo produto adicionando um ID
    const novo_produto = { ...dados, id : Date.now() };
    produtos.push(novo_produto);

    await AsyncStorage.setItem("produtos", JSON.stringify(produtos))
    console.log("Dados salvos com sucesso!")
    reset()
  }
  catch(error){
    console.log("Erro ao salvar: " + error)
  }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome de produto:</Text>
      <Controller 
      control={control}
      name="nome"
      rules={{required: "Nome dever ser obrigatório"}}
      render={({ field: { onChange, value}}) => (
        <TextInput
        style={styles.input}
        placeholder="Digite o nome do produto"
        onChangeText={onChange}
        value={value}
      />
  )}
      />
      {errors.nome && <Text>error.nome.message</Text>}
      
      <Text style={styles.label}>Descrição do produto:</Text>
      <Controller 
      control={control}
      name="descricao"
      rules={{required: "Descrição dever ser obrigatório"}}
      render={({ field: { onChange, value}}) => (
        <TextInput
        style={styles.input}
        placeholder="Digite a descrição do produto"
        onChangeText={onChange}
        value={value}
      />
  )}
      />

      {errors.nome && <Text>error.descricao.message</Text>}
      

      <Text style={styles.label}>Valor unitario:</Text>
      <Controller 
      control={control}
      name="valor"
      rules={{required: "Valor dever ser obrigatório"}}
      render={({ field: { onChange, value}}) => (
        <TextInput
        style={styles.input}
        placeholder="Valor do produto"
        keyboardType="numeric"
        onChangeText={onChange}
        value={value}
      />
  )}
      />
       {errors.nome && <Text>error.valor.message</Text>}


      <Button title="Salvar" onPress={handleSubmit(enviar)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

export default Tela_cadastro_produto;
