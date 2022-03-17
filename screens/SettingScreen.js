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
import { useNavigation, useTheme } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

const data = [
  {
    id: 0,
    title: 'Tu cuenta',
    description:
      'Ve la informacion de tu cuenta y obtén más información acerca de las opciones de desactivación de la cuenta.',
    screen: '',
    icon: 'user',
  },
  {
    id: 1,
    title: 'Pantalla y idiomas',
    description: 'Administra como vez el contenido en Bookend.',
    screen: 'DisplayScreen',
    icon: 'layout',
  },
  {
    id: 2,
    title: 'Tu actividad en Bookend',
    description: 'Consulta la informacion sobre a quien seguiste y que post te gustaron.',
    screen: '',
    icon: 'eyeo',
  },
  {
    id: 3,
    title: 'Reporta un problema',
    description: 'Ayudanos a mejorar reportando un bug o problemas de rendimiento.',
    screen: '',
    icon: 'warning',
  },
  {
    id: 4,
    title: 'Contacto del desarrollador',
    description: 'Ayudanos a mejorar reportando un bug o problemas de rendimiento.',
    screen: '',
    icon: 'rocket1',
  },
]

const Item = ({ title, description, screen, icon }) => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <TouchableHighlight
      onPress={() => screen !== '' && navigation.navigate(screen)}
      underlayColor={screen !== '' ? colors.colorUnderlay : 'transparent'}
    >
      <View style={styles.item}>
        <View style={styles.textContainer}>
          <AntDesignIcon
            name={icon}
            size={24}
            style={{ marginRight: 16, padding: 0 }}
            color={colors.textGray}
          />
          <View style={styles.text}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.description, { color: colors.textGray }]}>{description}</Text>
          </View>
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
  const { colors, dark } = useTheme()

  const renderItem = ({ item }) => (
    <Item title={item.title} screen={item.screen} description={item.description} icon={item.icon} />
  )

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={dark ? 'light-content' : 'dark-content'}
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
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
  },
})
