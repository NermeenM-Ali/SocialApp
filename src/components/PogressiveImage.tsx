import React, { useState } from 'react'
import { Animated, ImageSourcePropType, StyleSheet, View } from 'react-native'

interface ProgressiveImageProps {
    defaultImageSource: ImageSourcePropType
    imageSource: string,
    style: object,
}
const PogressiveImage = (props: ProgressiveImageProps) => {
    let defaultImageAnimated = useState(new Animated.Value(0))[0]
    let imageAnimated = useState(new Animated.Value(0))[0]

    const handleDefaultImageAnimation = () => {
        Animated.timing(defaultImageAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }
    const handleImageAnimation = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }
    let { defaultImageSource, imageSource, style } = props
    return (
        <View style={styles.container}>
            <Animated.Image
                style={[style, { opacity: defaultImageAnimated, }]}
                source={defaultImageSource}
                onLoad={handleDefaultImageAnimation}
                blurRadius={1}
                resizeMode='stretch' />
            <Animated.Image
                style={[styles.imageOverlay, style, { opacity: imageAnimated, }]}
                source={{ uri: imageSource }}
                onLoad={handleImageAnimation}
                resizeMode='stretch' />
        </View>
    )
}

export default React.memo(PogressiveImage)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e4e8'
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})
