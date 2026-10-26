
import { View, Image, ScrollView, Text, StyleSheet } from "react-native";
import { useState, useEffect, use } from "react";
import { Stack, useLocalSearchParams } from "expo-router";


export default function Details() {
const params= useLocalSearchParams(); 


useEffect(() => {
  if (typeof params.name === "string") {
    fetchPokemonByName(params.name);
  }
}, [params.name]);

async function fetchPokemonByName(name:string) {
    try {
        const resp = await fetch("https://pokeapi.co/api/v2/pokemon/${name}")
        const data= await resp.json();
    } catch (e) {
        console.log(e);
    }
}

return(
    <>
       <Stack.Screen options= {{ title: params.name as string, headerShown: true, }} />
        <ScrollView
        contentContainerStyle={{
            gap:16,
            padding: 16,
        }}
        >
            

        </ScrollView>
    </>
);



const styles=StyleSheet.create({

})

}