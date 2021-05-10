import React from 'react';
import {
  Text,
  useColorScheme,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';
import { styles } from "./styles";
import { HangmanIcon } from '../../Components'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Cities } from "../../Assets"

type Props = {
  navigation: any;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const { navigate } = navigation;
  const [selectdNumber, setSelectedNumber] = React.useState('');
  const [showError, setShowError] = React.useState(false)

  const [selectedQuestion, setSelectedQuestion] = React.useState({})

  const NumberList = () => {
    const keysRows = ['5', '6', '7', '8', '9']
    return (
      <View style={styles.keyboard}>

        <View style={styles.keyboardRow}>
          {keysRows.map((letter, index) => {
            if (letter == " ") {
              return <Text key={index}> </Text>
            } else if (selectdNumber.indexOf(letter) != -1) {
              return <View style={styles.keyItem} key={index}><Text key={index} style={styles.usedKey}>{letter}</Text></View>
            } else {
              return <TouchableHighlight
                onPress={() => {
                  setShowError(false)
                  let arr = Cities.filter(city => city.letters == parseInt(letter))
                  let randomIndex = Math.floor(Math.random() * (arr.length - 1));
                  setSelectedQuestion(arr[randomIndex]);
                  setSelectedNumber(letter)

                }} style={styles.keyItem} key={index}><Text style={styles.letter}>{letter}</Text></TouchableHighlight>


            }
          })}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.homeContainer}>
        <HangmanIcon />
        <Text>Please select the number of letters</Text>
        <NumberList />
        <Text style={styles.gameTitle}>H   A   N   G   M   A   N</Text>
        <Button
          onPress={() => {
            selectdNumber == "" ? setShowError(true) : navigate('GameScreen', { question: selectedQuestion })
          }}
          title="Tap to Play"
          style={styles.startGameBtn}
          accessibilityLabel="Click here to start the game"
        />

        {showError == true ? <Text style={{ color: "red" }}>Please select number first</Text> : null}
      </View>
    </SafeAreaView>

  );
};



