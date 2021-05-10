import React from 'react';
import {
  SafeAreaView,
  Text,
  useColorScheme,
  TouchableHighlight,
  Alert,
  View,
} from 'react-native';
import { styles } from "./styles"

import {
  Circle,
  Svg,
  G,
  Line,
  Rect
} from 'react-native-svg';


type Props = {
  navigation: any;
  route: any
};


export const GameScreen: React.FC<Props> = ({ navigation, route }) => {
  const { question } = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const [answer, setAnswer] = React.useState(question.answer.replace(/[^a-zA-Z]/gmi, " ").trim());
  const [hint, setHint] = React.useState(question.hint);
  const [correct, setCorrect] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);
  let left = [answer.length];
  for (let index = 0; index < answer.length; index++) {
    left[index] = answer[index] == " " ? "*" : " ";
  }
  const [usedLetters, setUsedLetters] = React.useState<string[]>([]);
  const [lettersLeft, setLettersLeft] = React.useState<string[]>(left);
  const [score, setScore] = React.useState(6);[];
  // const 
  React.useEffect(() => {
  });


  const validate = (usedLetters: string[], letter: string) => {
    usedLetters.push(letter);

    if (answer.toUpperCase().indexOf(letter) == -1) {
      setWrong(wrong + 1);
      if (score > 0) {
        setScore(score - 1);
      }
    } else {
      answer.toUpperCase().split("").map((value: string, index: number) => {
        if (value == letter) {
          let temp = lettersLeft;
          temp[index] = letter;

          setLettersLeft(temp);
          setCorrect(correct + 1)
        }
      });
    }
    if (lettersLeft.join("").replace(/\*/g, " ").toUpperCase() == answer.toUpperCase()) {
      Alert.alert(
        'You win',
        'You have gussed the correct answer',
        [
          { text: 'OK', onPress: () => navigation.goBack() },
        ],
        { cancelable: false }
      )
    }
    if (wrong > 4) {
      Alert.alert(
        'You Lost',
        'Answer: ' + answer.toUpperCase() + " " + hint,
        [
          { text: 'OK', onPress: () => navigation.goBack() },
        ],
        { cancelable: false }
      )
    }
  }

  const RenderDashes = () => {
    return (
      <View style={styles.dashes}>
        {lettersLeft.map((letter, index) => {
          if (letter == "*") {
            return (<View style={styles.dashItemContainer} key={index}><Text style={styles.dashBlankItem}>  </Text></View>)
          } else {
            return (<View style={styles.dashItemContainer} key={index}><Text style={styles.dashItem}>{letter}</Text>
              <Text style={styles.dashItem}>_</Text>
            </View>)
          }

        })}

      </View>
    )
  }

  const onKeyPress = (letter: string) => {
    if (usedLetters.indexOf(letter) == -1) {
      validate(usedLetters, letter);
    } else {
      return;
    }
  }
  const RenderKeyBoard = () => {
    const keysRows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      [" ", "Z", "X", "C", "V", "B", "N", "M", " "]]
    return (
      <View style={styles.keyboard}>
        {keysRows.map((keys, rowIndex) => {
          return (
            <View key={rowIndex} style={styles.keyboardRow}>
              {keys.map((letter, index) => {
                if (letter == " ") {
                  return <Text key={index}> </Text>
                } else if (usedLetters.indexOf(letter) != -1) {
                  return <View style={styles.keyItem} key={index}><Text key={index} style={styles.usedKey}>{letter}</Text></View>
                } else {
                  return <TouchableHighlight
                    onPress={onKeyPress.bind(this, letter)} style={styles.keyItem} key={index}><Text style={styles.letter}>{letter}</Text></TouchableHighlight>
                }
              })}
            </View>
          )
        })}
      </View>
    )
  }

  const HangComponent = () => {
    let top = <Rect fill="#053544" width="300" height="10" x="20" y="0" />
    let rope = <Line x1="250" y1="0" x2="250" y2="120" stroke="#895917" strokeWidth="5" id="rope" />;
    let head = <Circle cx="250" cy="150" r="30" id="head" fill="#ecd2b7" />;
    let bodyMain = <Rect width="10" height="100" x="245" y="150" id="bodyMain" fill="#ecd2b7" />
    let hands = <G><Line x1="250" y1="200" x2="220" y2="230" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="handLeft" />
      <Line x1="250" y1="200" x2="280" y2="230" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="handRight" /></G>;
    let legs = <G><Line x1="250" y1="250" x2="230" y2="300" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="legLeft" />
      <Line x1="250" y1="250" x2="270" y2="300" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="legRight" /></G>

    return (
      <Svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="svg-content" width="200" height="250">
        <Rect fill="#053544" width="10" height="400" x="20" y="0" />
        <Rect fill="#053544" width="300" height="10" x="0" y="400" />
        {wrong > 0 ? top : null}
        {wrong > 1 ? rope : null}
        {wrong > 2 ? head : null}
        {wrong > 3 ? bodyMain : null}
        {wrong > 4 ? hands : null}
        {wrong > 5 ? legs : null}
      </Svg>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        <Text style={styles.scoreText}>Chances: {score}</Text>
        <HangComponent />
        <RenderDashes />
        <View style={styles.hintContainer}><Text style={styles.hintText}>Hint : {hint}</Text></View>
        <RenderKeyBoard />
      </View>
    </SafeAreaView>
  );
};
