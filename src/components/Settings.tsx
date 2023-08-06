import { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Linking } from 'react-native';
import { Button, Portal, Paragraph, Dialog, Snackbar } from 'react-native-paper';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { storeDataToAsyncStorage, getAsyncStorageData } from '@/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    marginVertical: 65,
    marginHorizontal: 30,
  },
});

function Settings(props: any): JSX.Element {
  const [theme, setTheme] = useState('light');

  const [changeThemeValue, setChangeThemeValue] = useState('');

  const [visible, setVisible] = useState(false);

  const [snackBarVisible, setSnackBarVisible] = useState(false);

  useEffect(() => {
    getThemeData();
    props.navigation.addListener('focus', () => {
      getThemeData();
    });
  }, []);

  const getThemeData = async () => {
    const theme = await getAsyncStorageData('@theme');
    if (theme) {
      setTheme(theme);
    }
  };

  const handleLightThemeClick = () => {
    setVisible(true);
    setChangeThemeValue('light');
  };

  const handleDarkThemeClick = () => {
    setVisible(true);
    setChangeThemeValue('dark');
  };

  const handleWebClick = () => {
    Linking.openURL(`https://singapore-bus-arrival-web.vercel.app/`);
  };

  const handleConfirmButtonClick = () => {
    setVisible(false);

    storeDataToAsyncStorage('@theme', changeThemeValue);

    setSnackBarVisible(true);
  };

  const handleCancalButtonClick = () => {
    setVisible(false);
  };

  const onDismissSnackBar = () => {
    setSnackBarVisible(false);
  };

  const handleSingaporeMrtCurrentMapClick = () => {
    props.navigation.navigate(`SingaporeMrtMapPdf`, {
      uri: 'https://drive.google.com/uc?export=download&id=1hrIwwbgah0FKvWwRdXpvcGEG-AsYr3Yp',
    });
  };

  const handleSingaporeMrtFutureMapClick = () => {
    props.navigation.navigate(`SingaporeMrtMapPdf`, {
      uri: 'https://drive.google.com/uc?export=download&id=1vZGHSW_5pj5fMOEAhL42f0yCHLS4KaRb',
    });
  };

  const handleEmailIconClick = () => {
    Linking.openURL(`mailto:yeukfei02@gmail.com`);
  };

  const handleGithubIconClick = () => {
    Linking.openURL(`https://github.com/yeukfei02`);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme === 'light' ? 'white' : 'black' }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.viewContainer}>
        <Text
          style={{ fontSize: 25, fontWeight: 'bold', color: theme === 'light' ? 'black' : 'white' }}
        >
          Settings
        </Text>

        <View style={{ marginVertical: 20 }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => handleLightThemeClick()}>
            <View style={{ backgroundColor: 'tomato', padding: 15, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>LIGHT THEME</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDarkThemeClick()}>
            <View style={{ backgroundColor: 'gray', padding: 15, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>DARK THEME</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 20 }}></View>

        <Text
          style={{ fontSize: 25, fontWeight: 'bold', color: theme === 'light' ? 'black' : 'white' }}
        >
          Singapore Bus Arrival Web
        </Text>

        <View style={{ marginVertical: 20 }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => handleWebClick()}>
            <View
              style={{
                backgroundColor: 'lightcoral',
                paddingHorizontal: 35,
                paddingVertical: 15,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Web</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 20 }}></View>

        <Text
          style={{ fontSize: 25, fontWeight: 'bold', color: theme === 'light' ? 'black' : 'white' }}
        >
          Singapore Mrt Map
        </Text>

        <View style={{ marginVertical: 20 }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => handleSingaporeMrtCurrentMapClick()}>
            <View style={{ backgroundColor: 'orange', padding: 15, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Current Map</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSingaporeMrtFutureMapClick()}>
            <View style={{ backgroundColor: 'lightskyblue', padding: 15, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Future Map</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 20 }}></View>

        <Text
          style={{ fontSize: 25, fontWeight: 'bold', color: theme === 'light' ? 'black' : 'white' }}
        >
          Report a bug
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
          <TouchableOpacity onPress={() => handleEmailIconClick()}>
            <MaterialIcons name="email" size={50} color="indianred" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGithubIconClick()}>
            <AntDesign name="github" size={50} color="orchid" />
          </TouchableOpacity>
        </View>

        <Portal>
          <Dialog visible={visible}>
            <Dialog.Title>Change Theme</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Confirm to change <Text style={{ fontWeight: 'bold' }}>{changeThemeValue}</Text>{' '}
                theme?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button color="#1197d5" onPress={handleCancalButtonClick}>
                Cancel
              </Button>
              <Button onPress={handleConfirmButtonClick}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>

      <Snackbar
        style={{ backgroundColor: changeThemeValue === 'light' ? 'tomato' : 'gray' }}
        theme={{ colors: { accent: 'white' } }}
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}
        duration={1500}
      >
        Already change to {changeThemeValue} theme
      </Snackbar>
    </ScrollView>
  );
}

export default Settings;
