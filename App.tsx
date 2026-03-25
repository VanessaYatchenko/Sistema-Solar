import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

const planetas = [
  {
    nome: 'Mercúrio',
    dias: '88 dias terrestres',
    uri: 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
    texto: 'O menor planeta do Sistema Solar e o mais próximo do Sol. Tem uma superfície cheia de crateras.',
  },
  {
    nome: 'Vênus',
    dias: '225 dias terrestres',
    uri: 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg',
    texto: 'O planeta mais quente do Sistema Solar. Sua atmosfera é extremamente densa e tóxica.',
  },
  {
    nome: 'Terra',
    dias: '365 dias terrestres',
    uri: 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
    texto: 'Nosso planeta! O único conhecido por abrigar vida. 71% da superfície é coberta por água.',
  },
  {
    nome: 'Marte',
    dias: '687 dias terrestres',
    uri: 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
    texto: 'Conhecido como o Planeta Vermelho. Possui as maiores montanhas e cânions do Sistema Solar.',
  },
  {
    nome: 'Júpiter',
    dias: '4.333 dias terrestres (quase 12 anos)',
    uri: 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
    texto: 'O maior planeta do Sistema Solar. Tem uma Grande Mancha Vermelha que é uma tempestade gigante.',
  },
  {
    nome: 'Saturno',
    dias: '10.759 dias terrestres (quase 29 anos)',
    uri: 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
    texto: 'Famoso por seus belos anéis. É um gigante gasoso composto principalmente de hidrogênio e hélio.',
  },
  {
    nome: 'Urano',
    dias: '30.687 dias terrestres (84 anos)',
    uri: 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
    texto: 'Um gigante de gelo que gira "deitado" de lado. Tem um sistema de anéis fracos.',
  },
  {
    nome: 'Netuno',
    dias: '60.190 dias terrestres (quase 165 anos)',
    uri: 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
    texto: 'O planeta mais ventoso do Sistema Solar. Suas ventanias podem chegar a 2.100 km/h.',
  },
];

export default function App() {
  const [visible, setVisible] = useState(false);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const planeta = planetas[indiceAtual];

  const proximo = () => {
    setCarregando(true);
    setIndiceAtual((prev) => (prev + 1) % planetas.length);
  };

  const anterior = () => {
    setCarregando(true);
    setIndiceAtual((prev) => (prev - 1 + planetas.length) % planetas.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF69B4" />

      <Text style={styles.titulo}>Planetas do Sistema Solar</Text>

      <TouchableOpacity style={styles.botao} onPress={() => setVisible(true)}>
        <Text style={styles.textoBotao}>ABRIR MODAL DOS PLANETAS</Text>
      </TouchableOpacity>

      <Text style={styles.textoPlanetaAtual}>
        Planeta atual: <Text style={{ fontWeight: 'bold' }}>{planeta.nome}</Text>
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            
            <View style={styles.imagemContainer}>
              <Image
                source={planeta} 
                style={styles.modalImagem}
                resizeMode="cover"
                onLoad={() => setCarregando(false)}
                onError={() => setCarregando(false)}
              />
              {carregando && (
                <ActivityIndicator size="large" color="#87CEEB" style={styles.loader} />
              )}
            </View>

            <Text style={styles.modalNome}>{planeta.nome}</Text>
            <Text style={styles.modalDias}>{planeta.dias}</Text>
            <Text style={styles.modalTexto}>{planeta.texto}</Text>

            <View style={styles.navegacao}>
              <TouchableOpacity style={styles.botaoNav} onPress={anterior}>
                <Text style={styles.textoNav}>← Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoNav} onPress={proximo}>
                <Text style={styles.textoNav}>Próximo →</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.botaoFechar} onPress={() => setVisible(false)}>
              <Text style={styles.textoFechar}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF69B4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: '#87CEEB',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 30,
  },
  textoBotao: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  textoPlanetaAtual: { fontSize: 20, color: '#000', marginTop: 20 },

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConteudo: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#87CEEB',
  },

  imagemContainer: {
    position: 'relative',
    width: 240,
    height: 240,
    marginBottom: 20,
    borderRadius: 120,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  modalImagem: {
    width: '100%',
    height: '100%',
    borderRadius: 120,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -18,
  },

  modalNome: { fontSize: 34, fontWeight: 'bold', marginBottom: 8 },
  modalDias: { fontSize: 18, color: '#87CEEB', marginBottom: 15 },
  modalTexto: { 
    fontSize: 16, 
    color: '#333', 
    textAlign: 'center', 
    lineHeight: 24, 
    marginBottom: 25 
  },

  navegacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  botaoNav: {
    backgroundColor: '#87CEEB',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  textoNav: { color: '#000', fontSize: 16, fontWeight: 'bold' },

  botaoFechar: {
    backgroundColor: '#FF1493',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  textoFechar: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});