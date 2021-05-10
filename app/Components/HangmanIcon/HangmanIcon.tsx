import React from 'react';
import {
  View,
} from 'react-native';
import  {Circle, Svg, G, Line, Rect}  from 'react-native-svg';


export const HangmanIcon = ()=>(
    <View>
         <Svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="svg-content" width="250" height="250">
          <Rect fill="#053544" width="10" height="400" x="20" y="0" />
          <Rect fill="#053544" width="300" height="10" x="20" y="0" />
          <Rect fill="#053544" width="300" height="10" x="0" y="400" />
          <Line x1="250" y1 = "0" x2="250" y2 = "120" stroke="#895917" strokeWidth="5"/>
          <Circle cx="250" cy="150" r="30" fill="#ecd2b7" />
          <Rect width="10" height="100" x="245" y="150" fill="#ecd2b7"/><Line x1="250" y1="200" x2="220" y2="230" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="handLeft"/><Line x1="250" y1="200" x2="280" y2="230" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="handRight"/><Line x1="250" y1="250" x2="230" y2="300" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="legLeft"/><Line x1="250" y1="250" x2="270" y2="300" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="legRight"/>
        </Svg>
    </View>
    )
