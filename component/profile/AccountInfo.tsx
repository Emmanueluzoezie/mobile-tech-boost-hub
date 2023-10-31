import { View, Text, Image } from 'react-native'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_EMAIL } from '../../graphql/queries'
import { useSelector } from 'react-redux'
import { selectAppTheme, selectUserEmail } from '../../slice/AppSlices'
import ProfileHeader from './ProfileHeader'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'

const AccountInfo = () => {
    const getUserEmail = useSelector(selectUserEmail)

    const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: getUserEmail
        }
    })

    const appTheme = useSelector(selectAppTheme)

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor


    const userDetails = data?.getUserByEmail[0]

  return (
    <View>
        <ProfileHeader title="Account information" />
        <View style={[tailwind`flex-col justify-center items-center pt-8`]}>
              {userDetails?.image === "" ?
                  <View>
                      <View style={[tailwind` rounded-full w-[130px] h-[130px] items-center justify-center mx-2`, { backgroundColor: appColor.primaryColor }]}>
                          <Text style={[tailwind`text-[56px] font-bold`,
                              { color: appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>{userDetails?.first_name[0]}</Text>
                      </View>
                  </View>
                  :
                  <View style={[tailwind` rounded-full p-1 mx-2`, { backgroundColor: userDetails.email !== userDetails?.email ? appColor.primaryDarkColor : appColor.primaryColor }]}>
                      <Image source={{ uri: userDetails?.image }} style={tailwind`w-[100px] h-[100px]rounded-full`} />
                  </View>
              }
              <View>
                  <View style={tailwind`flex-row mt-2`}>
                      <Text style={[tailwind`font-semibold pb-1 text-[20px] pr-2`, { color, fontFamily: 'Lato-Bold' }]}>{userDetails?.first_name}</Text>
                      <Text style={[tailwind`font-semibold pb-1 text-[20px] capitalize`, { color, fontFamily: 'Lato-Bold' }]}>{userDetails?.last_name}</Text>
                  </View>
                <Text style={[tailwind`font-semibold pb-1 text-[16px] text-center`, { color, fontFamily: 'Lato-Bold' }]}>{userDetails.badge}</Text>
                <Text style={[tailwind`font-semibold pb-1 text-[16px] text-center`, { color, fontFamily: 'Lato-Bold' }]}>{userDetails.points} Points</Text>
              </View>
        </View>
        <View style={[tailwind`p-4`]}>
              {/* <View style={tailwind`flex-row items-center`}>
                  <Text style={[
                      tailwind` text-[16px] font-semibold capitalize`,
                      { color, fontFamily: 'Lato-Bold' }
                  ]}>Quiz level:</Text>
                  <Text style={[
                      tailwind`pl-1 text-[14px] font-semibold capitalize`,
                      { color: appColor.primaryColor, fontFamily: 'Lato-Bold' }
                  ]}>{userDetails?.badge}</Text>
              </View> */}
              {/* <View style={tailwind`flex-row items-center`}>
                  <Text style={[
                      tailwind`text-[16px]`,
                      { color, fontFamily: 'Lato-Bold' }
                  ]}>Points:</Text>
                  <Text style={[
                      tailwind`pl-1 text-[14px]`,
                      { color: appColor.primaryColor, fontFamily: 'Lato-Bold' }
                  ]}>{userDetails?.points}</Text>
              </View> */}
        </View>
    </View>
  )
}

export default AccountInfo