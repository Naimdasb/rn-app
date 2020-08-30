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
            <View>
                  <Text>Dolar Oficial Venta:</Text>
                  <Text>{ofVenta}</Text>
                  <Text>Dolar Oficial Compra:</Text>
                  <Text>{ofCompra}</Text>
                  <Text>Dolar Blue Venta:</Text>
                  <Text>{blueVenta}</Text>
                  <Text>Dolar Blue Compra:</Text>
                  <Text>{blueCompra}</Text>
            </View>
    )
}


