import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import tailwind from 'twrnc'
import FormComponentForNewUser from '../component/FormComponentForNewUser'
import { setUserEmail } from '../slice/AppSlices'

const QuestionTypeScreen = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        AsyncStorage.getItem('userEmail')
            .then((value) => {
                if (value !== null) {
                    dispatch(setUserEmail(value))
                }
            })
    }, [])
    
  return (
      <View style={[tailwind`flex-1 pt-10`]}>
          <FormComponentForNewUser />
      </View>
  )
}

export default QuestionTypeScreen