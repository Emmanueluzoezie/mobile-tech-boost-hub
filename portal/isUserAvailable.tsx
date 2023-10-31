import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import UnauthenticatedUser from './unauthenticatedUser';
import AuthenticatedUser from "./authenticatedUser"
import tailwind from 'twrnc';
import { useFonts } from 'expo-font';
import * as Splash from "expo-splash-screen"
import { selectIsUserLogin } from '../slice/AppSlices';


const IsUserAvailable = () => {
  const isUserAvailable = useSelector(selectIsUserLogin)
  const dispatch = useDispatch()


  return(
    <View style={tailwind`flex-1 justify-center`}>
      {isUserAvailable ?
        <AuthenticatedUser />
        :
         <UnauthenticatedUser />
        }
    </View>
  )
}

export default IsUserAvailable

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
});