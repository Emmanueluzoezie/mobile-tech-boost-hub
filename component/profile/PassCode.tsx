import { View, Text } from 'react-native'
import React from 'react'
import ProfileHeader from './ProfileHeader'
import tailwind from 'twrnc'
import WebView from 'react-native-webview'

const PassCode = () => {
  return (
    <View style={[tailwind`flex-1`]}>
      <ProfileHeader title="PassKey settings" />
      <View style={[tailwind` flex-1 bg-white w-full`,]}>
        <WebView
          source={{ uri: 'https://mobile-tech-boost-hub.vercel.app/dashboard' }}
          style={{ flex: 1, width: "100%", height: 600 }}
        />
      </View>
    </View>
  )
}

export default PassCode