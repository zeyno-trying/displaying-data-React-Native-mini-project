import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title:"Home",

        }}
    />
    <Stack.Screen
        name="details"
        options={{
          title:"Details",
          presentation: "modal",
          //sheetAllowedDetents: [0.5, 1],
          sheetCornerRadius: 30,
          
          headerShown: true,
        }}
    />
    </Stack>
  )
}
