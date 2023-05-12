import { View, Text, TouchableOpacity, Image, PermissionsAndroid} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, CameraIcon, ArrowUpTrayIcon, WifiIcon } from 'react-native-heroicons/solid';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import ImageCollage from '../components/ImageCollage';
import SanityClient, {urlFor} from '../sanity';
import Svg, { Path } from 'react-native-svg';

const GameScreen = () => {
    const navigation = useNavigation();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      SanityClient.fetch(`
      *[_type == "post" && _id == $id] {
        categories[]->{
          ...,
        }
      }
      `, {id}).then((data) => {
        setTasks(data[0].categories);
      });
    }, []);

    console.log(tasks);

    const handleImagePress = (index) => {
      setSelectedImage(index);
    };

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status == 'granted');
        })();
    }, [])

    const {
    params : {
        title,
        description,
        imgUrl,
        id,
    },
    } = useRoute();

    useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
    }, [])

  return (
    <SafeAreaView className="flex items-center w-full h-full">
        {/* Header */}
        <View className="flex-col h-auto items-start w-full">
        <TouchableOpacity onPress={navigation.goBack} className="flex-row justify-center items-center p-2 bg-rs-blue rounded w-auto my-4 left-4">
            <ArrowLeftIcon size={20} color="#ffffff"/>
            <Text className="text-slate-100 uppercase">Atpakaļ</Text>
        </TouchableOpacity>
        <View className="flex justify-center items-center w-full">
          <View className="flex-row items-center justify-center space-x-4">
            <View className="flex justify-center items-center w-20 h-20 bg-rs-blue rounded">
            <Image className="w-16 h-16 rounded object-contain" source={{uri : urlFor(imgUrl).url()}} />
            </View>
            <View className="flex justify-center items-center w-3/5">
            <Text className="uppercase text-xl text-center">{title}</Text>
            <Text className="uppercase text-rs-blue text-xs text-center">Atrodi un aizpildi tukšās ailes ar savām bildēm</Text>
            </View>
          </View>
        </View>
        </View>
        {/* Image Collage */}
        <View className="flex flex-wrap max-h-[360px] gap-1 mt-10">
        {tasks?.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
          <ImageCollage id={item._id} task={item.title} index={index} selected={selectedImage}/>
        </TouchableOpacity>
        ))}
        </View>
        {selectedImage !== null && (
        <View className="flex justify-center items-center w-11/12">
            <Text className="flex justify-center items-center text-base text-center">{description} un nofotogrāfē</Text>
            <Text className="font-semibold text-2xl text-rs-blue">{tasks[selectedImage]?.title}</Text>
        </View>
        )}
        {tasks?
        <View className="flex-row justify-center items-center px-10 mt-2">
            <TouchableOpacity
            onPress={() => {
                navigation.navigate('CameraScreen', {
                title,
                description,
                task : tasks[selectedImage]?.title,
                imgUrl,
                id : tasks[selectedImage]?._id,
                })
              }}
            className="flex-row justify-center items-center bg-rs-yellow rounded p-4 h-full w-1/5"
            >
            <ArrowUpTrayIcon size={30} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
                navigation.navigate('CameraScreen', {
                title,
                description,
                task : tasks[selectedImage]?.title,
                imgUrl,
                id : tasks[selectedImage]?._id,
                })
              }}
            className="flex justify-center items-center w-4/5 bg-rs-blue rounded p-1 ml-4"
            >
            <CameraIcon size={40} color="#ffffff" />
            <Text className="text-xs text-slate-100 font-semibold">Fotogrāfēt</Text>
            </TouchableOpacity>
        </View>
        :
        <View className="flex justify-center items-center w-full">
          <WifiIcon size={80} color="#7eb2ff" />
          <Text className="text-2xl text-rs-blue font-semibold uppercase w-2/3 text-center">Nav interneta savienojuma</Text>
          <Image className="w-40 h-48 -bottom-12 -right-16 absolute -z-10" source={require('../assets/shock-gnome.png')} />
        </View>
        }
        <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="absolute -z-10 opacity-50">
            <Path fill="#7EB2FF" d="M43.4,-65.7C53.4,-52.5,56.7,-36,60.9,-20.4C65,-4.9,70,9.8,62.9,16.9C55.7,24,36.3,23.6,23.8,33.9C11.2,44.1,5.6,65,-4.1,70.6C-13.8,76.3,-27.7,66.7,-38,55.7C-48.4,44.8,-55.4,32.5,-52.9,21.6C-50.5,10.6,-38.6,1,-35.6,-12.6C-32.5,-26.1,-38.4,-43.6,-34,-58.6C-29.5,-73.6,-14.8,-86.1,1,-87.5C16.7,-88.8,33.4,-78.9,43.4,-65.7Z" transform="translate(140 50)" />
        </Svg>
        <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="absolute -z-10 opacity-50">
            <Path fill="#7EB2FF" d="M43.4,-65.7C53.4,-52.5,56.7,-36,60.9,-20.4C65,-4.9,70,9.8,62.9,16.9C55.7,24,36.3,23.6,23.8,33.9C11.2,44.1,5.6,65,-4.1,70.6C-13.8,76.3,-27.7,66.7,-38,55.7C-48.4,44.8,-55.4,32.5,-52.9,21.6C-50.5,10.6,-38.6,1,-35.6,-12.6C-32.5,-26.1,-38.4,-43.6,-34,-58.6C-29.5,-73.6,-14.8,-86.1,1,-87.5C16.7,-88.8,33.4,-78.9,43.4,-65.7Z" transform="translate(10 -65)" />
        </Svg>
    </SafeAreaView>
  )
}

export default GameScreen