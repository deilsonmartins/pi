import React, {useState, useEffect} from 'react';

import {Alert, Image, View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';

import Constants from 'expo-constants'

import {Feather as Icon} from '@expo/vector-icons'

import {useNavigation, useRoute} from '@react-navigation/native';

import MapView, {Marker} from 'react-native-maps';

import {SvgUri} from 'react-native-svg';

import api from '../../services/api';

import * as Location from 'expo-location';

interface Item{
  id: number;
  name: string;
  image_url: string;
}

interface Teacher
{
  id: number,
  name: string,
  image: string,
  image_url: string,
  latitude: string,
  longitude: string,
}[];

interface Params
{
  uf: string;
  city: string;
}

const Teachers = () =>
{
  const navigation = useNavigation();

  const [subjects, setSubjects] = useState<Item[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])

  const route = useRoute();
  const routeParams = route.params as Params;

  let {city, uf} = routeParams;
  
  city = city.toLowerCase();
  uf = uf.toLowerCase();

  useEffect(() => 
  {
    async function loadPosition()
    {
      const {status} = await Location.requestPermissionsAsync();

      if (status !== 'granted')
      {
        Alert.alert('Oooops...', 'We need your permission to get the location')
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const {latitude, longitude} = location.coords;
      
      setInitialPosition([latitude, longitude])

    }

    loadPosition()
  }, [])
  useEffect(() => 
  {
      api.get('subjects').then(response => 
        {
          setSubjects(response.data);
        })
  }, [])

  useEffect(() => 
  {
    api.get('teachers', 
    {
      params:
      {
        city: city,
        uf: uf,
        subjects: selectedSubjects
      }
    }).then(response => 
      {
        setTeachers(response.data);
      })
  }, [selectedSubjects])

  function handleNavigateBack()
  {
    navigation.goBack();
  }

  function handleNavigateDetail(id: number)
  {
    navigation.navigate('Detail', {point_id: id});
  }

  function handleSelectItem(id: number)
    {
        const alreadySelected = selectedSubjects.findIndex(item => item === id)

        if (alreadySelected >= 0)
        {
            const filteredItems = selectedSubjects.filter(item => item !== id);
            setSelectedSubjects(filteredItems)
        }
        else
        {
            setSelectedSubjects([...selectedSubjects, id])
        }
        
    }
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" size={20} color='#000'/>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.description}>Find a teacher on the map</Text>
    
      <View style={styles.mapContainer}>
       {initialPosition[0] !== 0 && (
         <MapView 
         style={styles.map}
         initialRegion={{
           latitude: initialPosition[0],
           longitude: initialPosition[1],
           latitudeDelta: 0.014,
           longitudeDelta: 0.014,
         }}>
           {teachers.map(teacher =>
            (
              <Marker 
              key = {String(teacher.id)}
              style={styles.mapMarker}
              onPress={() => handleNavigateDetail(teacher.id)}
              coordinate={{
                latitude: Number(teacher.latitude),
                longitude: Number(teacher.longitude),
              }}>
                <View style={styles.mapMarkerContainer}>
                  <Image style={styles.mapMarkerImage} source={{uri: teacher.image_url}}/>
                  <Text style={styles.mapMarkerTitle}>{teacher.name}</Text>
                </View>
           </Marker>
            ))}
         </MapView>
       )}
    </View>
    </View>
    <View style={styles.itemsContainer}>
      <ScrollView 
      horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 20}}>
        {subjects.map(subject => 
          (
            <TouchableOpacity 
            key={String(subject.id)} 
            style={
              [
                styles.item,
                selectedSubjects.includes(subject.id) ? styles.selectedItem : {}
              ]} 
            onPress={() => {handleSelectItem(subject.id)}}
            activeOpacity={0.6}>
            <SvgUri width={42} height={42} uri={subject.image_url}/>
            <Text style={styles.itemTitle}>{subject.name}</Text>
          </TouchableOpacity>
          ))}
        </ScrollView>
    </View>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
    backgroundColor: '#58ACFA'
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#000',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    borderRadius: 10,
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 11,
    lineHeight: 23,
    textAlign: 'center'
  },

  itemsContainer: {
    flexDirection: 'row',
    backgroundColor: '#58ACFA',
    padding: 15
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#DF3A01',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Teachers;