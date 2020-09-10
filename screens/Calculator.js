import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';


export default function Calculator() {

    const [blueVenta, setBlueVenta] = useState("")
    const [blueCompra, setBlueCompra] = useState("")
    const [ofVenta, setOfVenta] = useState("")
    const [ofCompra, setOfCompra] = useState("")
    const [calc, setCalc] = useState(0)
    const [data, setData] = useState([
        { label: 'Oficial Venta' }, { label: 'Blue Venta' },
        { label: 'Oficial Compra' }, { label: 'Blue Compra' }
    
    ])
    const [value, setVal] = useState("Oficial Venta")
    const [result, setResult] = useState(0)

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

    const check = (text) => {

        switch(value) {
            case 'Oficial Venta':
                setResult( text * parseInt(ofVenta))
                setCalc(text)
                break;
            case 'Blue Venta':
                setResult( text * parseInt(blueVenta))
                setCalc(text)
                break;
            case 'Oficial Compra':
                setResult( text * parseInt(ofCompra))
                setCalc(text)
                break;
            case 'Blue Compra':
                setResult( text * parseInt(blueCompra))
                setCalc(text)
                break;            
            default:
                setResult( text * parseInt(ofVenta))
                setCalc(text)
            
        }
    }
    
    const btn = (text) => {

        switch(text.label) {
            case 'Oficial Venta':
                setVal(text.label)
                setResult(calc * parseInt(ofVenta))
                break;
            case 'Blue Venta':
                setVal(text.label)
                setResult(calc * parseInt(blueVenta))
                break;
            case 'Oficial Compra':
                setVal(text.label)
                setResult(calc * parseInt(ofCompra))
                break;
            case 'Blue Compra':
                setVal(text.label)
                setResult(calc * parseInt(blueCompra))
                break;
            default:
                setVal(text.label)
                setResult(calc * parseInt(ofVenta))
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>$ {isNaN(result)? '0': result}</Text>
            <TextInput
                  style={styles.input}
                  onChangeText={(text) => check(text)}
            />
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
        fontSize: 15,
        color:"black",
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#3Cdf71",
        margin: 40
    },
    input: {
      textAlign: "center",
      width: "70%",
      height: 40,
      backgroundColor: '#3Cdf7105', 
      borderColor: '#3Cdf71', 
      borderWidth: 1,
      borderRadius: 50,
      fontSize: 15,
      marginBottom: 20
    }
})