import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { selectAppTheme, selectUserEmail } from '../../slice/AppSlices'
import { GET_ALL_USER } from '../../graphql/queries'
import { appColor } from '../AppColor'
import LoadingAppComponent from '../LoadingAppComponent'

const LeaderBoardComponent = () => {
    const [userRank, setUserRank] = useState(0)
    const [userDetails, setUserDetails] = useState<any>({})
    const appTheme = useSelector(selectAppTheme)
    const getUserEmail = useSelector(selectUserEmail)
    const navigation = useNavigation()

    const { data, loading, error } = useQuery(GET_ALL_USER)

    const userInfo = data?.getUserList

    const userInfoCopy = [...userInfo];

    const sortedList = userInfoCopy.sort((a, b) => b.coins - a.coins);

    const top20Leader = sortedList.slice(0, 20);

    useEffect(() => {
        const userInfoCopy = [...userInfo];
        const sortedUsers = userInfoCopy.sort((a, b) => b.coins - a.coins);

        const currentUserIndex = sortedUsers.findIndex((user) => user.email === getUserEmail);

        if (currentUserIndex !== -1) {
            const currentUser = sortedUsers[currentUserIndex];
            setUserDetails(currentUser);
            setUserRank(currentUserIndex + 1);
        } else {
            return;
        }
    }, []);

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
    return (
        <View style={tailwind`flex-1`}>
            {loading ?
                <LoadingAppComponent />
                :
                error ?
                    <View style={[tailwind`flex-1 justify-center items-center`,]}>
                        <Text style={[tailwind`text-[16px]`, { color, fontFamily: "Lato-Bold" }]}>Oops! An error occur in our end. Check your internet connection and try again</Text>
                        <TouchableOpacity style={[tailwind`justify-center items-center px-4 mt-6 py-2 rounded-md`, { backgroundColor: buttonColor }]} onPress={() => navigation.goBack()}>
                            <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>Click to reload</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={tailwind`flex-1 pt-6`}>
                        <View style={tailwind`flex-1 px-4`}>

                            <View style={[tailwind`flex-row justify-between items-center mt-3 pb-2`]}>
                                <Text style={[tailwind`font-semibold text-[16px]`, { color, fontFamily: 'Lato-Bold' }]}>Top 20 overall Leaders board</Text>
                                <View style={tailwind`flex-row items-center`}>
                                    <Text style={[tailwind`pr-1 font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Sort</Text>
                                    <AntDesign name="caretdown" size={12} color={color} />
                                </View>
                            </View>
                            <View style={[tailwind`p-2 rounded-md my-2`, { backgroundColor: appColor.primaryDarkColor }]}>
                                <Text style={[tailwind`pl-4 font-semibold`, { fontFamily: 'Lato-Bold' }]}>Your rank</Text>
                                <View style={tailwind`flex-row items-center px-2`}>
                                    <Text style={{ color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }}>{userRank}</Text>
                                    {userDetails?.image === "" ?
                                        <View>
                                            <View style={[tailwind` rounded-full w-[50px] h-[50px] items-center justify-center mx-2`, { backgroundColor: appColor.primaryColor }]}>
                                                <Text style={[tailwind`text-[26px] font-bold`,
                                                { color, fontFamily: 'Lato-Bold' }]}>{userDetails?.first_name[0]}</Text>
                                            </View>
                                        </View>
                                        :
                                        <View style={[tailwind` rounded-full p-1 mx-2`, { backgroundColor: userDetails.email !== userDetails?.email ? appColor.primaryDarkColor : appColor.primaryColor }]}>
                                            <Image source={{ uri: userDetails?.image }} style={tailwind`w-[40px] h-[40px] rounded-full`} />
                                        </View>
                                    }
                                    <View style={tailwind`flex-1`}>
                                        <View style={[tailwind`flex-row items-center`]}>
                                            <View style={tailwind`flex-1 flex-row`}>
                                                <Text style={[tailwind`font-semibold pb-1 text-[16px] pr-2 capitalize`, { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }]}>{userDetails?.first_name}</Text>
                                                <Text style={[tailwind`font-semibold pb-1 text-[16px] capitalize`, { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }]}>{userDetails?.last_name}</Text>
                                            </View>
                                            <View style={tailwind`pr-3 flex-row`}>
                                                <Text style={[tailwind`font-semibold pb-1 text-[16px] pr-1 capitalize`, { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }]}>Point:</Text>
                                                <Text style={[tailwind`font-semibold pb-1 text-[16px] capitalize`, { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }]}>{userDetails?.points}</Text>
                                            </View>
                                        </View>
                                        <Text style={[tailwind`text-[13px]`, { color: "black", fontFamily: 'Lato-Regular' }]}>Over all Quiz</Text>
                                    </View>
                                    <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`]}>
                                        <AntDesign name="caretdown" size={12} color={buttonColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FlatList
                                data={top20Leader}
                                keyExtractor={(user) => user.id}
                                renderItem={({ item, index }) => {
                                    if (item?.first_name === userDetails?.full_name) {
                                        return null; // Hide the item
                                    }
                                    return (<View style={[tailwind`p-2 rounded-md my-2 ${item?.first_name === userDetails?.first_name && "hidden"}`, { backgroundColor: containerColor }]}>
                                        <View style={tailwind`flex-row items-center px-2`}>
                                            <Text style={{ color, fontFamily: 'Lato-Bold' }}>{index + 1}</Text>
                                            {item?.image === "" ?
                                                <View>
                                                    <View style={[tailwind` rounded-full w-[50px] h-[50px] items-center justify-center mx-2`, { backgroundColor: appColor.primaryColor }]}>
                                                        <Text style={[tailwind`text-[26px] font-bold`,
                                                        { color, fontFamily: 'Lato-Bold' }]}>{item?.first_name[0]}</Text>
                                                    </View>
                                                </View>
                                                :
                                                <View style={[tailwind` rounded-full p-1 mx-2`, { backgroundColor: item.email !== item?.email ? appColor.primaryDarkColor : appColor.primaryColor }]}>
                                                    <Image source={{ uri: item?.image }} style={tailwind`w-[40px] h-[40px] rounded-full`} />
                                                </View>
                                            }
                                            <View style={[tailwind`flex-row items-center`]}>
                                                <View style={tailwind`flex-1 flex-row`}>
                                                    <Text style={[tailwind`font-semibold pr-2 pb-1 text-[16px]`, { color, fontFamily: 'Lato-Bold' }]}>{item?.first_name}</Text>
                                                    <Text style={[tailwind`font-semibold pb-1 text-[16px]`, { color, fontFamily: 'Lato-Bold' }]}>{item?.last_name}</Text>
                                                </View>
                                                <View style={tailwind`flex-1 flex-row`}>
                                                    <Text style={[tailwind`font-semibold pr-2 pb-1 text-[16px]`, { color, fontFamily: 'Lato-Bold' }]}>Points:</Text>
                                                    <Text style={[tailwind`font-semibold pb-1 text-[16px]`, { color, fontFamily: 'Lato-Bold' }]}>{item?.points}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`]}>
                                                <AntDesign name="caretdown" size={12} color={buttonColor} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>)
                                }}
                            />
                        </View>
                    </View>
            }
        </View>
    )
}

export default LeaderBoardComponent

const styles = StyleSheet.create({})