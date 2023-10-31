import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { selectAppTheme } from '../../slice/AppSlices'
import { appColor } from '../AppColor'

const ResultComponent = ({question, correctAnswer}) => {
    const navigation = useNavigation()
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <ScrollView>
        <View style={tailwind`p-1`}>
            <View style={[tailwind`p-3 rounded-md`,
            { backgroundColor: containerColor }]}>
                <Text style={[tailwind`text-[15px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>{question}</Text>
                <Text style={[tailwind`text-[13px] pt-2`, { color, fontFamily: 'Lato-Bold' }]}>{correctAnswer}</Text>
            </View>
        </View>
    </ScrollView>
  )
}

export default ResultComponent

const styles = StyleSheet.create({})