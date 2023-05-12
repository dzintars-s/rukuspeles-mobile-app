import { View, Text, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { BellIcon } from "react-native-heroicons/outline";
import Svg, { Path } from 'react-native-svg';
import GameCard from '../components/GameCard';
import SanityClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [gameInfo, setGameInfo] = useState([]);

    useEffect(() => {
      SanityClient.fetch(`
      *[_type == "post"] {
        ...,
        categories[]->{
          ...,
        }
      }
      `).then((data) => {
        setGameInfo(data);
      });
    }, []);

    console.log(gameInfo);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);
  return (
    <SafeAreaView className="h-full w-full bg-rs-blue/10">
      {/* Header */}
      <View className="flex-row items-center justify-between space-x-2 bg-white rounded-full px-5 py-3 my-3 w-full">
      <View>
      <Text className="text-lg font-extrabold">Sveika, Ilze!</Text>
      <Text className="text-xs font-semibold uppercase text-slate-400">Rūķu skola</Text>
      </View>
      <View className="flex-row items-center space-x-2">
      <Image className="w-12 h-12 rounded-full" source={require('../assets/avatar-girl.png')} />
      </View>
      </View>
      {/* Banner */}
      <View className="flex items-center justify-start mx-4 pb-3">
        <View className="flex-row justify-between items-center w-full h-36 rounded-2xl bg-rs-blue overflow-hidden">
          <Text className="text-white text-xl font-extrabold px-4 w-1/2">Vai esi gatavs rūķu pastaigā?</Text>
          <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="absolute -z-10">
            <Path fill="#FFCB7E" d="M51.9,-62.7C66.8,-49.3,78.1,-32.5,81.1,-14.5C84.1,3.6,78.7,23,68.9,39.7C59.1,56.4,45,70.6,27.1,79C9.2,87.5,-12.3,90.3,-26.9,81.7C-41.4,73,-48.9,52.8,-59.5,34.4C-70.1,16,-83.8,-0.6,-84.6,-18.1C-85.3,-35.6,-73,-54,-56.8,-67.2C-40.5,-80.3,-20.3,-88.2,-0.9,-87.2C18.5,-86.1,36.9,-76.1,51.9,-62.7Z" transform="translate(140 50)" />
          </Svg>
        </View>
      </View>
      {/* Games Card */}
      {gameInfo?.map(category => (
      <GameCard
      key={category._id}
      id={category._id}
      title={category.title}
      description={category.slug.current}
      imgUrl={category.mainImage}
      />
      ))}
      <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="absolute -z-10 opacity-50">
          <Path fill="#7EB2FF" d="M43.4,-65.7C53.4,-52.5,56.7,-36,60.9,-20.4C65,-4.9,70,9.8,62.9,16.9C55.7,24,36.3,23.6,23.8,33.9C11.2,44.1,5.6,65,-4.1,70.6C-13.8,76.3,-27.7,66.7,-38,55.7C-48.4,44.8,-55.4,32.5,-52.9,21.6C-50.5,10.6,-38.6,1,-35.6,-12.6C-32.5,-26.1,-38.4,-43.6,-34,-58.6C-29.5,-73.6,-14.8,-86.1,1,-87.5C16.7,-88.8,33.4,-78.9,43.4,-65.7Z" transform="translate(10 -65)" />
      </Svg>
    </SafeAreaView>
  )
}

export default HomeScreen