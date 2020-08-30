import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';


export default function Calculator() {

    const [blueVenta, setBlueVenta] = useState("")
    const [blueCompra, setBlueCompra] = useState("")
    const [ofVenta, setOfVenta] = useState("")
    const [ofCompra, setOfCompra] = useState("")
    const [calc, setCalc] = useState(0)
    const [data, setData] = useState([{ label: 'Oficial' }, { label: 'Blue' }])
    const [value, setVal] = useState("Oficial")
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

      if(value === "Oficial"){
          setResult( text * parseInt(ofVenta))
          setCalc(text)
      } else {
          setResult(text * parseInt(blueVenta))
          setCalc(text)
      }
    }
    
    const btn = (text) => {

      if(text.label === "Oficial"){
      setVal(text.label)
      setResult(calc * parseInt(ofVenta))
      } else {
       setVal(text.label)
       setResult(calc * parseInt(blueVenta))
      }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>$ {result}</Text>
            <RadioButtonRN
               style={{color:"black", width: "100%"}}
               data={data}
               selectedBtn={(text) => { btn(text)}}
            />
    
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => check(text)}
                />
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "pink",
        flex: 1,
        alignItems: "center",
    },
    text: {
        fontSize: 28,
        color:"black",
        padding: 40,
        textAlign: "center"
    },
    input: {
      textAlign: "center",
      width: "50%",
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1,
      borderRadius: 10,
      margin: 30,
      fontSize: 22
    }
})