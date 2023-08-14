import { type CommonScreenProps } from '@/types';
import { useEffect, useState } from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View, Alert, Switch } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { getAsyncStorageData, storeDataToAsyncStorage } from '@/utils';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const Settings = ({ navigation }: CommonScreenProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  useEffect(() => {
    void getThemeData();
    navigation.addListener('focus', getThemeData);
  }, []);

  const getThemeData = async () => {
    const theme = await getAsyncStorageData('@theme');
    if (theme) {
      setTheme(theme);
    }
  };

  const handleToggleDialog = () => {
    setIsEnabled((previousState) => !previousState);

    const type = isEnabled ? 'light' : 'dark';
    setTheme(isEnabled ? 'light' : 'dark');
    void storeDataToAsyncStorage('@theme', type);
    setSnackBarVisible(true);
  };

  const onDismissSnackBar = () => {
    setSnackBarVisible(false);
  };

  const handleEmailIconClick = () => {
    void Linking.openURL(`mailto:goflvhxj2547@gmail.com`);
  };

  const handleGithubIconClick = () => {
    void Linking.openURL(`https://github.com/inseong-so`);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme === 'light' ? 'white' : 'black' }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        style={{
          marginVertical: 65,
          marginHorizontal: 30,
        }}
      >
        <Text
          style={{ fontSize: 25, fontWeight: 'bold', color: theme === 'light' ? 'black' : 'white' }}
        >
          테마 설정
        </Text>

        <View style={{ marginVertical: 20 }} />

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
        >
          <TouchableOpacity>
            <MaterialIcons name="wb-sunny" size={50} color="#ffa13e" />
          </TouchableOpacity>
          <Switch
            trackColor={{ false: '#767577', true: '#ffffff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#ffa13e'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleDialog}
            value={isEnabled}
          />
          <TouchableOpacity>
            <MaterialIcons name="nightlight-round" size={50} color="#f5dd4b" />
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 20 }}></View>

        <Text
          style={{ fontSize: 25, fontWeight: 'bold', color: theme === 'light' ? 'black' : 'white' }}
        >
          연락처
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
          <TouchableOpacity onPress={handleEmailIconClick}>
            <MaterialIcons name="email" size={50} color="indianred" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGithubIconClick}>
            <AntDesign name="github" size={50} color="orchid" />
          </TouchableOpacity>
        </View>
      </View>

      <Snackbar
        style={{ backgroundColor: theme === 'light' ? '#767577' : '#ffffff' }}
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}
        duration={1000}
      >
        <Text style={{ color: theme === 'light' ? '#ffffff' : '#767577' }}>
          성공적으로{' '}
          <Text style={{ fontWeight: 'bold' }}>{theme === 'light' ? '라이트' : '다크'}</Text> 테마로
          변경 되었습니다.
        </Text>
      </Snackbar>
    </ScrollView>
  );
};

export default Settings;
