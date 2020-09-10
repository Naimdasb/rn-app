import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {

    const [blueVenta, setBlueVenta] = useState("")
    const [blueCompra, setBlueCompra] = useState("")
    const [ofVenta, setOfVenta] = useState("")
    const [ofCompra, setOfCompra] = useState("")
    

    useEffect(()=> {
        getPrice()
    }, [])

    const getPrice = () => {
        fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
            .then(res => res.json())
            .then(res => {
                setBlueVenta(res[1].casa.venta.slice(0,6))
                setBlueCompra(res[1].casa.compra.slice(0,6))
                setOfVenta(res[0].casa.venta.slice(0,5))
                setOfCompra(res[0].casa.compra.slice(0,5))
            })
    }

    
    return (
            <View style={styles.container}>
                <View style={styles.priceBox}>
                    <View style={styles.iconBox}>
                    <Icon name="logo-usd" size={20} color="white" />
                    </View>
                    <Text style={styles.text}>Dolar Oficial Venta:</Text>
                    <Text style={styles.text}>{ofVenta}</Text>
                </View>
                <View style={styles.priceBox}>
                    <View style={styles.iconBox}>
                    <Icon name="logo-usd" size={20} color="white" />
                    </View>
                    <Text style={styles.text}>Dolar Oficial Compra:</Text>
                    <Text style={styles.text}>{ofCompra}</Text>
                </View>
                <View style={styles.priceBox}>
                    <View style={styles.iconBox}>
                    <Icon name="logo-usd" size={20} color="white" />
                    </View>
                    <Text style={styles.text}>Dolar Blue Venta:</Text>
                    <Text style={styles.text}>{blueVenta}</Text>
                </View>
                <View style={styles.priceBox}>
                    <View style={styles.iconBox}>
                    <Icon name="logo-usd" size={20} color="white" />
                    </View>
                    <Text style={styles.text}>Dolar Blue Compra:</Text>
                    <Text style={styles.text}>{blueCompra}</Text>
                </View>
               
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    priceBox: {
        backgroundColor: "#eee",
        width: '90%',
        marginTop: 10,
        borderRadius: 40,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    iconBox: {
        backgroundColor: '#3Cdf71',
        borderWidth: 0,
        borderRadius: 40,
        padding: 15
    }
})
