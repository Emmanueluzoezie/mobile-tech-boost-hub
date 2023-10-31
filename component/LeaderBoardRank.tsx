import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, selectUserEmail, selectUserRank, setUserRank } from '../slice/AppSlices'
import { appColor } from './AppColor'
import tailwind from 'twrnc'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { GET_ALL_USER, GET_USER_BY_EMAIL } from '../graphql/queries'
import LoadingAppComponent from './LoadingAppComponent'

const LeaderBoardRank = () => {
    const [userDetails, setUserDetails] = useState<any>({})
    const appTheme = useSelector(selectAppTheme)
    const userRank = useSelector(selectUserRank)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const getUserEmail = useSelector(selectUserEmail)

    const { data, loading, error } = useQuery(GET_ALL_USER)

    const userInfo = data?.getUserList

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const primary = appTheme === "dark"? appColor.primaryDarkColor : appColor.primaryColor 

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground: appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const sortedUserInfo = userInfo?.slice().sort((a, b) => b.coins - a.coins);
    const topThreeLeaders = sortedUserInfo?.slice(0, 3);

    useEffect(() => {
        if (data) {
            // Create a copy of the userInfo array
            const sortedUsers = [...userInfo].sort((a, b) => b.coins - a.coins);

            const currentUserIndex = sortedUsers.findIndex((user) => user.email === getUserEmail);

            if (currentUserIndex !== -1) {
                const currentUser = sortedUsers[currentUserIndex];
                setUserDetails(currentUser);
                dispatch(setUserRank(currentUserIndex + 1));
            }
        }
        
    }, []);

  return (
      <View style={tailwind`mt-2  px-4`}>
          <View style={[tailwind`flex-row justify-between items-center py-3`]}>
            <Text style={[
                tailwind`font-semibold text-[16px]`,
                { color, fontFamily: 'Lato-Bold' }
            ]}>Top 5 LeaderBoard</Text>
            <TouchableOpacity onPress={() => navigation.navigate("leaderboard")} >
                <View style={[tailwind`flex-row items-center`]}>
                    <Text style={[
                        tailwind` px-2 font-semibold`,
                        { color, fontFamily: 'Lato-Bold' }
                    ]}>See all</Text>
                    <AntDesign name="caretdown" size={12} color={color} />
                </View>
            </TouchableOpacity>
        </View>
        {loading?
            <View style={[tailwind`w-full h-[70px] rounded-md`, {backgroundColor: containerColor}]} />
            :
            error?
                <View style={[tailwind`flex-1 justify-center items-center`,]}>
                    <Text style={[tailwind`text-[16px]`, { color, fontFamily: "Lato-Bold" }]}>Oops! An error occur in our end. Check your internet connection and try again</Text>
                    <TouchableOpacity style={[tailwind`justify-center items-center px-4 mt-6 py-2 rounded-md`, { backgroundColor: primary }]} onPress={() => navigation.goBack()}>
                    <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>Click to reload</Text>
                    </TouchableOpacity>
                </View>
                :
            <View style={[tailwind``]}>
                <FlatList
                    data={topThreeLeaders}
                    keyExtractor={(user) => user.id.toString()}
                    renderItem={({ item, index }) =>  (<View style={[tailwind`p-2 rounded-md my-2}`, { backgroundColor: item.email === userDetails?.email? appColor.primaryDarkColor : containerColor }]}>
                            {item.email === userDetails?.email && <Text style={[tailwind`pl-4 font-semibold`, { fontFamily: 'Lato-Bold' }]}>Your rank</Text>}
                            <View style={tailwind`flex-row items-center`}>
                                <Text style={{ color, fontFamily: 'Lato-Bold' }}>{index + 1}</Text>
                                
                            {item?.image === ""?
                                <View>
                                    <View style={[tailwind` rounded-full w-[50px] h-[50px] items-center justify-center mx-2`, { backgroundColor: appColor.primaryColor }]}>
                                        <Text style={[tailwind`text-[26px] font-bold`,
                                        { color, fontFamily: 'Lato-Bold' }]}>{item?.first_name[0]}</Text>
                                    </View>
                                </View>
                                :
                                <View style={[tailwind` rounded-full p-1 mx-2`, { backgroundColor: item.email !== userDetails?.email? appColor.primaryDarkColor : appColor.primaryColor }]}>
                                    <Image source={{ uri: item?.image }} style={tailwind`w-[40px] h-[40px] rounded-full`} />
                                </View>
                            }

                                <View style={tailwind`flex-1 flex-row`}>
                                    <Text style={[tailwind`font-semibold pb-1 text-[16px] pr-2`, { color, fontFamily: 'Lato-Bold' }]}>{item.first_name}</Text>
                                    <Text style={[tailwind`font-semibold pb-1 text-[16px] capitalize`, { color, fontFamily: 'Lato-Bold' }]}>{item.last_name}</Text>
                                </View>
                                <View style={[tailwind`flex-row items-center`]}>
                                    <Text style={[tailwind`font-semibold pb-1 pr-2 text-[14px]`, { color, fontFamily: 'Lato-Bold' }]}>{item.points} points</Text>
                                    <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`]}>
                                        <AntDesign name="caretdown" size={12} color={primary} />
                                    </TouchableOpacity>
                                    </View>
                            </View>
                        </View>)
                    }
                />
            </View>
        }
    </View>
  )
}

export default LeaderBoardRank

const styles = StyleSheet.create({})