import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity';

const GameCard = ({
    title, 
    description, 
    imgUrl,
    id,
    }) => {
    
    const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={() => {
      navigation.navigate('GameScreen', {
        title,
        description,
        imgUrl,
        id,
      })
    }}
    >
      <View className="flex-col items-center justify-items-center mx-6 pb-3">
        <View className="flex-row justify-start items-center bg-rs-blue/20 rounded-2xl w-full h-auto space-x-2 p-2 border-2 border-rs-blue/40">
          <View className="flex justify-center items-center w-20 h-20 bg-rs-blue rounded-2xl">
            <Image className="w-16 h-16 rounded-2xl object-contain" source={{uri : urlFor(imgUrl).url()}} />
          </View>
          <View className="">
            <Text className="text-lg font-bold text-slate-700 uppercase">{title}</Text>
            <Text className="text-xs text-slate-400">{description}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
  )
}

export default GameCard