/* eslint-disable react/prop-types */
import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  View,
} from 'react-native'

const data = [
  {
    id: 0,
    title: 'Tu cuenta',
    description:
      'Ve la informacion de tu cuenta y obtén más información acerca de las opciones de desactivación de la cuenta.',
  },
  {
    id: 1,
    title: 'Pantalla y idiomas',
    description: 'Administra como vez el contenido en Bookend.',
  },
  {
    id: 2,
    title: 'Tu actividad en Bookend',
    description: 'Consulta la informacion sobre a quien seguiste y que post te gustaron.',
  },
  {
    id: 3,
    title: 'Reporta un problema',
    description: 'Ayudanos a mejorar reportando un bug o problemas de rendimiento.',
  },
  {
    id: 4,
    title: 'Contacto del desarrollador',
    description: 'Ayudanos a mejorar reportando un bug o problemas de rendimiento.',
  },
]

const Item = ({ title, description }) => (
  <TouchableHighlight
    onPress={() => console.log('press')}
    underlayColor='#0003'
    style={{ display: 'flex', paddingVertical: 10, paddingHorizontal: 16 }}
  >
    <View>
      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ color: '#fff' }}>{description}</Text>
    </View>
  </TouchableHighlight>
)

const SettingScreen = () => {
  const renderItem = ({ item }) => <Item title={item.title} description={item.description} />

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle='light-content'
        backgroundColor='#192734'
      />
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  )
}
export default SettingScreen
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#192734',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
})
