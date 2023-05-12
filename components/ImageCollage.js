import { View, Text, Image, StyleSheet } from 'react-native'
import { PlusIcon } from 'react-native-heroicons/outline';
import React, { useEffect, useState } from 'react'
import { getItemFor } from "../components/StorageHelper";

const ImageCollage = ({id = null, task = null, index = null, selected = null}) => {
  const [image, setImage] = useState("")

  useEffect(() => {
    const getData = async () => {
      const image = await getItemFor(id);
      if (image !== null) {
        setImage(image)
      }
    };

    getData().catch((error) => {console.log(error)})
  }, [])
  return (
    <View>
    {index == 3 ?
    <View className="flex items-center">
    <View className={`flex justify-center items-center border-dashed border-2 ${index == selected ? 'border-rs-yellow' : 'border-rs-blue'} h-[330px] w-auto aspect-[9/16] overflow-hidden`}>
        <View className={`absolute flex justify-center items-center rounded-full ${index == selected ? 'bg-rs-yellow' : 'bg-rs-blue'} w-12 h-12`}>
        <PlusIcon size={32} color="#ffffff"/>
        </View>
        <Image className="w-52 h-64 object-contain absolute -z-10 -right-6 -bottom-24 opacity-10" source={require('../assets/curious-gnome.png')} />
        {!image ? null :
        <Image className="w-full h-full z-10" source={{uri : image}} /> }
    </View>
    <Text className={`absolute bottom-0 p-2 w-full flex justify-center items-center text-xl text-center font-semibold ${index == selected ? 'text-rs-yellow' : 'text-rs-blue'}`}>{task}</Text>
    </View>
    :
    <View className="">
    <View className={`flex justify-center items-center border-dashed border-2 ${index == selected ? 'border-rs-yellow' : 'border-rs-blue'}  h-[107px] w-auto aspect-[9/16]`}>
        <View className={`absolute flex justify-center items-center rounded-full ${index == selected ? 'bg-rs-yellow' : 'bg-rs-blue'}  w-6 h-6`}>
        <PlusIcon size={20} color="#ffffff"/>
        </View>
        {!image ? null :
        <Image className="w-full h-full z-10" source={{uri : image}} /> }
    </View>
    <Text className={`absolute bottom-0 p-2 w-full flex justify-center items-center text-center text-[8px] font-semibold ${index == selected ? 'text-rs-yellow' : 'text-rs-blue'}`}>{task}</Text>
    </View>
    }
    </View>
  )
}

export default ImageCollage