import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { selectAppTheme, selectUserEmail, setUserData } from '../../slice/AppSlices';
import { GET_ALL_USER, GET_USER_BY_EMAIL } from '../../graphql/queries';
import { ADD_USER } from '../../graphql/mutations';
import { appColor } from '../AppColor';

const DashBoardHeader = () => {
    const [copyMessage, setCopyMessage] = useState("")
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()
    const getUserEmail = useSelector(selectUserEmail)
    const dispatch = useDispatch()

    const { data, loading, error } = useQuery(GET_ALL_USER)
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: getUserEmail
        }
    })

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
    const container = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const userInfo = userData?.getUserByEmail[0]

    useEffect(() => {
        if (userData) {
            dispatch(setUserData({
                email: userInfo?.email,
                badge: userInfo?.badge,
                first_name: userInfo?.first_name,
                last_name: userInfo?.last_name,
                points: userInfo?.points,
                image: userInfo?.image,
                created_at: userInfo?.created_at,
                username: userInfo?.username,
                isAdmin: userInfo?.isAdmin,
                id: userInfo?.id
            }));
        }
    }, [userData])

    return (
        <View style={[tailwind`pt-10 relative pb-4`, {backgroundColor: appColor.lightContainerBackground}]}>
            {loading || userLoading ?
                <View style={tailwind`px-4 flex-row items-center`}>
                    <View style={[tailwind`w-[32px] h-[32px] rounded-full`, { backgroundColor: container }]} />
                    <View style={tailwind`pl-4 flex-1`}>
                        <View style={[tailwind`w-full h-[14px] mb-2`, { backgroundColor: container }]} />
                        <View style={[tailwind`w-full h-[14px]`, { backgroundColor: container }]} />
                    </View>
                </View>
                :
                <View>
                    <View style={tailwind` flex-row items-center px-3`}>
                        <TouchableOpacity style={tailwind` flex-1 flex-row items-center`}
                            onPress={() => navigation.navigate("profile")
                            }>
                            {userInfo?.image === ""?
                                <View>
                                    <View style={[tailwind` rounded-full w-[40px] h-[40px] items-center justify-center`, { backgroundColor: appColor.primaryDarkColor }]}>
                                        <Text style={[ tailwind`text-[26px] font-bold`,
                                        { color, fontFamily: 'Lato-Bold' }]}>{userInfo?.first_name[0]}</Text>
                                    </View>
                                </View>
                                :
                                <View style={[tailwind` rounded-full p-1`, { backgroundColor: appColor.primaryDarkColor }]}>
                                    <Image source={{ uri: userInfo?.image }} style={tailwind`w-[40px] h-[40px] rounded-full`} />
                                </View>
                            }
                            <View>
                                <View style={tailwind`pl-2 flex-row`}>
                                    <Text style={[
                                        tailwind`text-[16px] pr-2 font-bold`,
                                        { color, fontFamily: 'Lato-Bold' }]}
                                        numberOfLines={1}
                                        ellipsizeMode='tail'>{userInfo?.first_name}</Text>
                                    <Text style={[
                                        tailwind`text-[16px] font-bold`,
                                        { color, fontFamily: 'Lato-Bold' }]}
                                        numberOfLines={1}
                                        ellipsizeMode='tail'>{userInfo?.last_name}</Text>

                                </View>
                                <View style={[tailwind`flex-row justify-between items-center px-1 `]}>
                                    <View style={tailwind`flex-row items-center pl-2`}>
                                        <Text style={[
                                            tailwind`pl-1 text-[14px]`,
                                            { color, fontFamily: 'Lato-Bold' }
                                        ]}>Points:</Text>
                                        <Text style={[
                                            tailwind`pl-1 text-[14px]`,
                                            { color: appColor.primaryColor, fontFamily: 'Lato-Bold' }
                                        ]}>{userInfo?.points}</Text>
                                    </View>
                                </View>
                            </View>
                            
                        </TouchableOpacity>
                        <View style={[tailwind`pl-2`]}><Ionicons name="notifications" size={20} color={appColor.primaryColor} /></View>
                    </View>
                </View>
            }
        </View>
    )
}

export default DashBoardHeader

const styles = StyleSheet.create({})