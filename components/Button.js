import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'

export const Button = ({ title, onClick }) => {

    function updateOnclick(title){
        return title
    }

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <Text style={styles.title}>{ updateOnclick(title) }</Text>
            </View>
        </TouchableOpacity>
    )
}

export const ButtonHighlight = () => {
    return (
        <TouchableHighlight onPress={()=>{}} activeOpacity={0.6} underlayColor="red">
            <View style={styles.container}>
                <Text style={styles.title}>Здесь будет кнопка</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        padding: 10,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',

        shadowColor: "#fff",
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: .36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff'

    }
})

//export default Button