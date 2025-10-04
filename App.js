import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const salvarDados = async () => {
    if (nome && senha) {
      await AsyncStorage.setItem('usuario', JSON.stringify({ nome, senha }));
      Alert.alert('Sucesso', 'Usuário cadastrado!');
      setNome('');
      setSenha('');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <TouchableOpacity style={styles.botao} onPress={salvarDados}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const validarLogin = async () => {
    const dados = await AsyncStorage.getItem('usuario');
    const usuario = JSON.parse(dados);

    if (usuario && nome === usuario.nome && senha === usuario.senha) {
      navigation.navigate('Filmes');
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <TouchableOpacity style={styles.botao} onPress={validarLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function FilmesScreen({ navigation }) {
  const filmes = [
    { nome: 'Senhor dos Anéis', tela: 'Senhor dos Anéis' },
    { nome: 'Cidadão Kane', tela: 'Cidadão Kane' },
    { nome: 'O Poderoso Chefão', tela: 'O Poderoso Chefão' },
    { nome: 'O Rei Leão', tela: 'O Rei Leão' },
    { nome: 'Vingadores: Ultimato', tela: 'Vingadores: Ultimato' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha um filme:</Text>
      {filmes.map((filme) => (
        <TouchableOpacity
          key={filme.tela}
          style={styles.botao}
          onPress={() => navigation.navigate(filme.tela)}
        >
          <Text style={styles.botaoTexto}>{filme.nome}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const Sinopse = ({ route }) => {
  const { titulo, descricao } = route.params;
  return (
    <View style={styles.sinopse}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text>{descricao}</Text>
    </View>
  );
};

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Filmes" component={FilmesScreen} />
      <Stack.Screen
        name="Senhor dos Anéis"
        component={Sinopse}
        initialParams={{
          titulo: 'Senhor dos Anéis',
          descricao: 'Um hobbit embarca em uma jornada épica para destruir um anel maligno e salvar a Terra Média.',
        }}
      />
      <Stack.Screen
        name="Cidadão Kane"
        component={Sinopse}
        initialParams={{
          titulo: 'Cidadão Kane',
          descricao: 'A história de um magnata da imprensa e sua busca por significado através da palavra "Rosebud".',
        }}
      />
      <Stack.Screen
        name="O Poderoso Chefão"
        component={Sinopse}
        initialParams={{
          titulo: 'O Poderoso Chefão',
          descricao: 'Uma saga familiar sobre poder, lealdade e crime na máfia italiana.',
        }}
      />
      <Stack.Screen
        name="O Rei Leão"
        component={Sinopse}
        initialParams={{
          titulo: 'O Rei Leão',
          descricao: 'Simba embarca em uma jornada para reivindicar seu lugar como rei da savana.',
        }}
      />
      <Stack.Screen
        name="Vingadores: Ultimato"
        component={Sinopse}
        initialParams={{
          titulo: 'Vingadores: Ultimato',
          descricao: 'Os heróis restantes enfrentam Thanos em uma batalha final para restaurar o universo.',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-plus" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="login" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  botao: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  sinopse: {
    padding: 20,
  },
});