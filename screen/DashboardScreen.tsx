import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import BottomNavigationContainer from '../component/BottomNavigationContainer'
import LeaderBoardRank from '../component/LeaderBoardRank'
import DashboardComponent from '../component/dashboard/DashboardComponent'
import DashBoardHeader from '../component/dashboard/DashboardHeader'

const DashboardScreen = () => {
  return (
    <View style={[tailwind`flex-1 relative`]}>
      <View style={[tailwind`flex-1`]}>
        <DashBoardHeader />
        <DashboardComponent />
        <LeaderBoardRank />
      </View>
      <BottomNavigationContainer />
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})