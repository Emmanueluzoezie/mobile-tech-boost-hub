import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import BottomNavigationContainer from '../component/BottomNavigationContainer'
import LeaderBoardHeader from '../component/leaderboard/leaderBoardHeader'
import LeaderBoardComponent from '../component/leaderboard/LeaderBoardComponent'

const LeaderBoardScreen = () => {
  return (
    <View style={[tailwind`flex-1 relative`]}>
      <View style={[tailwind`flex-1`]}>
        <LeaderBoardHeader />
        <LeaderBoardComponent />
      </View>
      <BottomNavigationContainer />
    </View>
  )
}

export default LeaderBoardScreen

const styles = StyleSheet.create({})