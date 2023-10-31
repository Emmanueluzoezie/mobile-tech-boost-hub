import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { selectAppTheme } from '../../slice/AppSlices'
import { appColor } from '../AppColor'

const LeaderBoardHeader = () => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    return (
        <View style={[tailwind`flex-row justify-center items-center px-2 pt-10 pb-3`, { backgroundColor: containerColor }]}>
            <Text style={[tailwind`text-[18px]`, { fontFamily: "Lato-Bold" }]}>Leader Board</Text>
        </View>
    )
}

export default LeaderBoardHeader

const styles = StyleSheet.create({})