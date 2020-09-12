import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {

    const [prices, setPrices] = useState({
        blueVenta: '',
        blueCompra: '',
        ofVenta: '',
        ofCompra: ''
    })
    

    useEffect(()=> {
        getPrice()
    }, [])

    const getPrice = () => {
        fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
            .then(res => res.json())
            .then(res => {
                setPrices({
                    blueVenta: res[1].casa.venta.slice(0,6),
                    blueCompra: res[1].casa.compra.slice(0,6),
                    ofVenta: res[0].casa.venta.slice(0,5),
                    ofCompra: res[0].casa.compra.slice(0,5)

                })
            })
    }

    
    return (
            <View style={styles.container}>
                <Text style={styles.head}>Dolaricese App</Text>
                <View style={styles.priceBox}>
                    <View style={styles.iconBox}>
                    <Icon name="logo-usd" size={20} color="white" />
                    </View>
                    <Text style={styles.text}>Dolar Oficial Venta:</Text>
                    <Text style={styles.text}>{prices.ofVenta}</Text>
                </View>
                <View style={styles.priceBox}>
                    <View style={styles.iconBox}>
                    <Icon name="logo-usd" size={20} color="white" />
                    </View>
                    <Text style={styles.text}>Dolar Oficial Compra:</Text>
                    <Text style={styles.text}>{prices.ofCompra}</Text>
                </View>
                <View style={styles.priceBox}>
                    <View style={styles.iconBox}>
                    <Icon name="logo-usd" size={20} color="white" />
                    </View>
                    <Text style={styles.text}>Dolar Blue Venta:</Text>
                    <Text style={styles.text}>{prices.blueVenta}</Text>
                </View>
                <View style={styles.priceBox}>
                    <View style={styles.iconBox}>
                    <Icon name="logo-usd" size={20} color="white" />
                    </View>
                    <Text style={styles.text}>Dolar Blue Compra:</Text>
                    <Text style={styles.text}>{prices.blueCompra}</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    priceBox: {
        backgroundColor: "#3Cdf7160",
        width: '90%',
        marginTop: 10,
        borderRadius: 40,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: 'black',
    },
    iconBox: {
        backgroundColor: '#3Cdf71',
        borderWidth: 0,
        borderRadius: 40,
        padding: 15
    },
    head: {
        margin: 35,
        fontSize: 30,
    }
})
