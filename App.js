import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Button, RefreshControl } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE }  from 'react-native-maps'

// cremos una constante donde vamos a decir que la longitud es nula para q se muestre dependiendo en donde esta la persona
const initialStation = {
         latitude: null,
        longitude: null,
       latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
}

export default function App() {
  let myMap;
  const [curentPosition, setCurentPosition] = useState(initialStation);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      alert(JSON.stringify(position))
      
      const {longitude, latitude } = position.coords;

      setCurentPosition({
        ...curentPosition,
        latitude,
        longitude, 
      })


    }, error =>alert(error.message),
      {  timeout: 20000, maximumAge: 1000 }
    )
  
  }, [])
  
  return curentPosition.latitude ? (
    // retornamos el viewMap para q se muestre el mapa
    <MapView 
       ref={ref => myMap = ref}
      provider={PROVIDER_GOOGLE}
      style={{ flex:1 }}
      showsUserLocation
      initialRegion={curentPosition}
      >
      //Con esto creamos el marcador y se dibuja 
      <Marker
        coordinate= {{
          latitude:-0.302676,
          longitude: -78.5631468,
        }}
        onPress={()=>{
          myMap.fitToCoordinates([{
            latitude:-0.302676,
          longitude: -78.5631468,
          }],{
           
              animated:true
          }
          )
        }}
      />
      
      
</MapView>
  // activamos el indicador  
  ) : <ActivityIndicator style={{flex: 2}} animating size="medium" />  


};
// le damos estilo a la app
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
