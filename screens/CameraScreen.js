import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Camera, CameraType, ImageType } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CameraIcon, PlusIcon, CheckIcon, XMarkIcon, ArrowLeftIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import { storeData } from "../components/StorageHelper";
import Svg, { Path, Rect, Pattern, Defs } from 'react-native-svg';

const CameraScreen = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    const {
        params : {
            title,
            description,
            imgUrl,
            task,
            id,
        },
    } = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
        try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            setImage(data.uri);
        } catch(e) {
            console.log(e);
        }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                const asset = await MediaLibrary.createAssetAsync(image);
                const album = await MediaLibrary.createAlbumAsync("Rūķu pastaiga", asset);
                console.log(album)
                setImage(null);
            } catch (e) {
                console.log(e);
            }
        }
    }

  return (
    <View>
    {!image ?
    <SafeAreaView className="w-full h-full bg-black/90">
    <Camera
        type={type}
        flashMode={flash}
        ref={cameraRef}
    >
    <SafeAreaView className="flex justify-center items-center aspect-[9/16] h-auto w-full">
    <View className="flex justify-center items-center border-2 border-slate-100 border-dashed w-3/4 h-auto aspect-[9/16] space-y-1">
    </View>
    <Text className="text-white uppercase text-3xl text-center font-bold mb-2 mt-4 w-3/4">{task}</Text>
    <Image className="w-52 h-52 object-contain absolute -z-10 -right-20 -bottom-32" source={require('../assets/curious-gnome.png')} />
    </SafeAreaView>
    </Camera>
    <SafeAreaView className="flex items-center justify-center">
    <TouchableOpacity
    onPress={takePicture}
    className="w-20 h-20 flex justify-center items-center">
    <Svg viewBox="0 0 200 200" className="absolute" xmlns="http://www.w3.org/2000/svg">
    <Path fill="#EE378E" d="M44.9,-77C58.4,-69.9,69.9,-58.4,77.3,-44.9C84.8,-31.3,88.3,-15.6,88,-0.2C87.6,15.2,83.4,30.5,75.4,43.1C67.4,55.8,55.6,65.9,42.5,73.6C29.3,81.3,14.6,86.6,-0.2,86.9C-15,87.2,-30,82.5,-42.9,74.6C-55.8,66.8,-66.6,55.7,-75.6,42.8C-84.6,29.8,-91.9,14.9,-92.6,-0.4C-93.2,-15.7,-87.3,-31.3,-78.6,-44.9C-69.9,-58.5,-58.5,-70,-45,-77.1C-31.4,-84.2,-15.7,-86.8,0,-86.7C15.7,-86.7,31.3,-84,44.9,-77Z" transform="translate(100 100)" />
    </Svg>
    <CameraIcon size={34} color="#ffffff" />
    </TouchableOpacity>
    </SafeAreaView>
    </SafeAreaView>
    : 
    // Taken Photo
    <SafeAreaView className="w-full h-full bg-black/90">
    <SafeAreaView className="flex justify-center items-center aspect-[9/16]">
    <Image source={{uri: image}}  className="w-full h-full"/>
    </SafeAreaView>
    <SafeAreaView className="flex-row items-center justify-between px-4">
    <TouchableOpacity
        onPress={() => {
            navigation.navigate('GameScreen', {
            image : image,
            title,
            description,
            imgUrl,
            });saveImage;storeData(id, image);
          }}
        className="flex-row items-center bg-slate-500 rounded-full p-3"
        >
        <CheckIcon size={30} color="#ffffff" />
        <Text className="text-slate-100 uppercase ml-2">Saglabāt</Text>
    </TouchableOpacity>
    <TouchableOpacity
        onPress={() => setImage(null)}
        className="flex justify-center items-center rounded-full w-16 h-16"
        >
        <Svg viewBox="0 0 200 200" className="absolute" xmlns="http://www.w3.org/2000/svg">
        <Path fill="#EE378E" d="M42.3,-73.7C54.2,-66.5,62.7,-53.8,69.9,-40.6C77.2,-27.4,83.2,-13.7,83.7,0.3C84.2,14.3,79.3,28.6,71.9,41.7C64.6,54.7,54.9,66.5,42.5,74.9C30.2,83.3,15.1,88.1,-0.5,89C-16.1,89.9,-32.2,86.7,-44.8,78.5C-57.4,70.3,-66.6,57,-74.8,43.1C-82.9,29.2,-90.1,14.6,-90.3,-0.1C-90.5,-14.8,-83.8,-29.7,-75.5,-43.3C-67.1,-56.8,-57,-69.1,-44.2,-75.7C-31.3,-82.3,-15.7,-83.3,-0.2,-82.9C15.2,-82.6,30.5,-80.9,42.3,-73.7Z" transform="translate(100 100)" />
        </Svg>
        <XMarkIcon size={30} color="#ffffff" />
    </TouchableOpacity>
    </SafeAreaView>
    </SafeAreaView>
    }
    </View>
  )
}

export default CameraScreen