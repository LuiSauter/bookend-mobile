/* eslint-disable react/prop-types */
import { useNavigation, useTheme } from '@react-navigation/native'
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
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { useToggle } from '../hooks/useToggle'

const data = [
  {
    id: 0,
    title: 'Tu cuenta',
    description:
      'Ve la informacion de tu cuenta y obtén más información acerca de las opciones de desactivación de la cuenta.',
    screen: 'AccountScreen',
  },
  {
    id: 1,
    title: 'Pantalla y idiomas',
    description: 'Administra como vez el contenido en Bookend.',
    screen: 'DisplayScreen',
  },
  {
    id: 2,
    title: 'Tu actividad en Bookend',
    description: 'Consulta la informacion sobre a quien seguiste y que post te gustaron.',
    screen: 'ActivityScreen',
  },
  {
    id: 3,
    title: 'Reporta un problema',
    description: 'Ayudanos a mejorar reportando un bug o problemas de rendimiento.',
    screen: 'ContactSceen',
  },
  {
    id: 4,
    title: 'Contacto del desarrollador',
    description: 'Ayudanos a mejorar reportando un bug o problemas de rendimiento.',
    screen: 'ContactSceen',
  },
]

const Item = ({ title, description, screen }) => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate(screen)}
      underlayColor={colors.colorUnderlay}
    >
      <View style={styles.item}>
        <View style={styles.text}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.description, { color: colors.textGray }]}>{description}</Text>
        </View>
        <AntDesignIcon
          name='right'
          size={20}
          style={{ marginRight: 0, padding: 0 }}
          color={colors.textGray}
        />
      </View>
    </TouchableHighlight>
  )
}

const SettingScreen = () => {
  const { darkTheme } = useToggle()
  const { colors } = useTheme()

  const renderItem = ({ item }) => (
    <Item title={item.title} screen={item.screen} description={item.description} />
  )

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
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
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
  },
})
