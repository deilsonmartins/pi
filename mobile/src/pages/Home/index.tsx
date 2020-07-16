import React, {useState} from 'react';

import {Feather as Icon} from '@expo/vector-icons';

import { TextInput, Text , StyleSheet, View} from 'react-native';

import {RectButton} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';

const Home = () =>
{
  const [uf, setUf] = useState<string>('State');
  const [city, setCity] = useState<string>('City');

  const navigation = useNavigation();

  function handleNavigateToMap()
  {
    handleNavigatePoint(uf, city)
    navigation.navigate('Teachers');
  }

  function handleSubmitUf(text: string)
  {
    setUf(text)
  }

  function handleSubmitCity(text: string)
  {
    setCity(text)
  }

  function handleNavigatePoint(uf: string, city: string)
  {
    navigation.navigate('Teachers', {uf: uf, city: city});
  }

  return (
    <View 
      style={styles.container}> 
      <View style={styles.main}>
        <Text style={styles.title}>We help students find private teachers</Text>
        <Text style={styles.description}>We connect students to the best teachers</Text>
      </View>

      <View>
        <TextInput 
        style={styles.input} 
        onChangeText={text => handleSubmitUf(text)}
        value={uf}
        autoCapitalize={'characters'}
        allowFontScaling/>
        <TextInput 
        style={styles.input} 
        onChangeText={text => handleSubmitCity(text)}
        value={city}
        />
      </View>
      
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigateToMap}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24}/>
            </Text>
          </View>
          <Text style={styles.buttonText}>Sign In</Text>
        </RectButton>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#58ACFA'
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#000',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#0B2161',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;