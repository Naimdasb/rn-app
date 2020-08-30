import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
                
                  <Text style={styles.text}>Dolar Oficial Venta:</Text>
                  <Text style={styles.text}>{ofVenta}</Text>
                  <Text style={styles.text}>Dolar Oficial Compra:</Text>
                  <Text style={styles.text}>{ofCompra}</Text>
                  <Text style={styles.text}>Dolar Blue Venta:</Text>
                  <Text style={styles.text}>{blueVenta}</Text>
                  <Text style={styles.text}>Dolar Blue Compra:</Text>
                  <Text style={styles.text}>{blueCompra}</Text>
               
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "pink",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 40
    }
})
