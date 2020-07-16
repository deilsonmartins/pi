import React, {useEffect, useState} from 'react';

import {Linking, Text, Image, View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';

import {Feather as Icon, FontAwesome} from '@expo/vector-icons'

import {useNavigation, useRoute} from '@react-navigation/native';

import {RectButton} from 'react-native-gesture-handler';

import api from '../../services/api';

import * as MailComposer from 'expo-mail-composer';

interface Params
{
  point_id: number;
}

interface Data{
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsaap: string;
    city: string;
    uf: string;
    subjects: [];
}
const Detail = () =>
{
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => 
  {
    
    api.get(`teachers/${routeParams.point_id}`).then(response=>
      {
          setData(response.data)
      })
  }, [])

  function handleNavigateBack()
  {
    navigation.goBack();
  }

  function handleComposeMail()
  {
    MailComposer.composeAsync(
      {
        subject: 'Interest in private lessons',
        recipients: [data.email]
      }
    )
  }

function handleWhatsaap()
{
  Linking.openURL(`whatsapp://send?phone=${data.whatsaap}&text=I am interested in private lessons`);
}
  if (!data)
  {
    return null;
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" size={20} color='#34cb70'/>
      </TouchableOpacity>
      <Image style={styles.pointImage} source={{uri: data.image_url}}/>
      <Text style={styles.pointName}>{data.name}</Text>
      
      <View style={styles.address}>
            <Text style={styles.addressTitle}>Endereço</Text>
            <Text style={styles.addressContent}>{data.city.toLocaleUpperCase()} / {data.uf.toLocaleUpperCase()}</Text>
            <Text style={styles.pointItems}>{data.subjects.map(subject => subject).join(', ')}</Text>
            
      </View>
    </View>
    <View style={styles.footer}>
      <RectButton style={styles.button} onPress={handleWhatsaap}>
        <FontAwesome name="whatsapp" size={20} color="#FFF"/>
        <Text style={styles.buttonText}>Whatsapp</Text>
      </RectButton>

      <RectButton style={styles.button} onPress={handleComposeMail}>
        <Icon name="mail" size={20} color="#FFF"/>
        <Text style={styles.buttonText}>Email</Text>
      </RectButton>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;