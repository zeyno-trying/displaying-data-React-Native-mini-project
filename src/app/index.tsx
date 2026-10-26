
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, ScrollView, View, StyleSheet, Pressable } from "react-native";



interface Pokemon{
  name: string;
  image: string;
  imageBack: string;
  types: PokemonTypes[];
}

interface PokemonTypes{
  type: {
    name: string;
  } 
}

const colorByType = {
  grass: "#d2e5cc",
  fire: "#f5e5cb",
  bug: "#d2e5cc",
  water: "#bce4ff",
  normal: "#fffed8",
  fighting: "#f2c6c6",
  flying: "#d9d5f5",
  poison: "#e6c9ed",
  ground: "#f0d8b5",
  rock: "#ded5c5",
  ghost: "#d5d0ed",
  steel: "#d5dfe8",
  electric: "#c1f5cb",
  psychic: "#f7cce0",
  ice: "#c9f0ed",
  dragon: "#c6c4ed",
  dark: "#d0c9c5",
  fairy: "#f7d5e5",
  stellar: "#d1e1f5",
  unknown: "#e5e5e5"
};

export default function Index() {
 const [pokemons, setPokemons]= useState<Pokemon[]>([]);
  useEffect (() => { 
     // fetch pokemons
     fetchPokemons()
  }, [])

  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
  
      const data= await response.json()

      // fetch details about pokemons
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return{
            name: pokemon.name,
            image:details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          }
        })
      )


      setPokemons(detailedPokemons);
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
 
  return (
    <ScrollView
      contentContainerStyle={{
        gap:16,
        padding:20,

      }}
    >
      {pokemons.map((pokemon) => 
      <Link key={pokemon.name}
        href={{pathname: "/details", params: {name: pokemon.name}}}
      >
        <View
              style={{
                // @ts-ignore
                backgroundColor: colorByType[pokemon.types[0].type.name],
                padding: 20,
                borderRadius: 20,
                alignItems: "center",

              } }
        
        >
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
          <View
            style={{
            flexDirection: "row",
            }}
          >
            <Image
              source={ {uri: pokemon.image}}
              style={{width:  150, height: 150}}
            />
            <Image
              source={ {uri: pokemon.imageBack}}
              style={{width:  150, height: 150}}
            />
          </View>
        </View>
      </Link>
    )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 18,
    fontWeight: "medium",
    textAlign: "center",
  
  },
});
