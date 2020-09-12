import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Calculator() {

    const [prices, setPrices] = useState({
        blueVenta: '',
        blueCompra: '',
        ofVenta: '',
        ofCompra: ''
    })

    const [calc, setCalc] = useState(0)
    
    const [value, setVal] = useState("Oficial Venta")

    const [result, setResult] = useState(0)
    const [result_b, setResult_b] = useState(0)
    
    const [selected, setSelected] = useState(0)

    const data = [
        { label: 'Oficial Venta' }, { label: 'Blue Venta' },
        { label: 'Oficial Compra' }, { label: 'Blue Compra' }
    ]

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

    const calculate = (text, key, current) => {
        if(key === 0) {
            setResult( text * parseInt(current))
            setCalc(text)
            setSelected(0)
        } else {
            setResult_b( text / parseInt(current))
            setCalc(text)
            setSelected(1)
        }
    }

    const check = (text, key) => {

        switch(value) {
            case 'Oficial Venta':
                calculate(text, key, prices.ofVenta)
                break;
            case 'Blue Venta':
                calculate(text, key, prices.blueVenta)
                break;
            case 'Oficial Compra':
                calculate(text, key, prices.ofCompra)
                break;
            case 'Blue Compra':
                calculate(text, key, prices.blueCompra)
                break;    
            default:
                calculate(text, key, prices.ofVenta)
        }
    }

    const reCalculate = (text, current) => {
            setVal(text.label)
            if(selected === 0) {
                setResult(calc * parseInt(current))
                
            } else {
                setResult_b( calc / parseInt(current))
            }
    }
    
    const btn = (text) => {

        switch(text.label) {
            case 'Oficial Venta':
               reCalculate(text, prices.ofVenta)
               break;
            case 'Blue Venta':
                reCalculate(text, prices.blueVenta)
                break;
            case 'Oficial Compra':
                reCalculate(text, prices.ofCompra)
                break;
            case 'Blue Compra':
                reCalculate(text, prices.blueCompra)
                break;
            default:
                reCalculate(text, prices.ofVenta)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{marginTop: 30}}>Dolar a Pesos</Text>
            <View style={styles.boxDisplay}>
                <TextInput
                    style={styles.input}
                    onFocus={() => setSelected(0)}
                    maxLength={7}
                    onChangeText={(text) => check(text, 0)}
                />
                <View style={styles.iconBox}>
                    <Icon name="swap-horizontal-outline" size={35} color="#3C9f71" />
                </View>
                <Text style={styles.text}>$ {isNaN(result)? '0.00': result.toFixed(2)}</Text>
            </View>
            <Text>Pesos a Dolar</Text>
            <View style={styles.boxDisplay}>
                <TextInput
                    style={styles.input}
                    onFocus={() => setSelected(1)}
                    maxLength={7}
                    onChangeText={(text) => check(text, 1)}
                />
                <View style={styles.iconBox}>
                    <Icon name="swap-horizontal-outline" size={35} color="#3C9f71" />
                </View>
                <Text style={styles.text}>u$s {isNaN(result_b)? '0.00': result_b.toFixed(2)}</Text>
            </View>
            <Text style={{marginTop: 30}}>Seleccione precio a cotizar</Text>
            <RadioButtonRN
               style={{color:"black", width: "100%"}}
               data={data}  
               activeColor='#3Cdf71'
               boxActiveBgColor='#3Cdf7133'
               initial={1}
               selectedBtn={(text) => { btn(text)}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start'
    },
    text: {
        flex: 1,
        fontSize: 15,
        color:"black",
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#3Cdf71",
        
    },
    input: {
      textAlign: "center",
      flex: 1,
      width: "30%",
      height: 42,
      backgroundColor: '#3Cdf7105', 
      borderColor: '#3Cdf71', 
      borderWidth: 1,
      borderRadius: 50,
      fontSize: 15
    },
    boxDisplay: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 20
    },
    iconBox: {
        flex: 1,
        alignItems: 'center'
    }
})