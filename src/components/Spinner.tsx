import React from 'react'
import { ActivityIndicator } from 'react-native'

const Spinner = ({ color }: any) => {
    return (
        <ActivityIndicator color={color} size='small' />
    )
}

export default React.memo(Spinner)
