import React, { useState, useEffect, useRef } from "react";
import { Button, Platform, View, Text } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Acceder a la variable de entorno GOOGLE_SERVICES_FILE
  const googleServicesFile = Constants.expoConfig?.extra?.googleServicesFile;

  // Log para debugging
  useEffect(() => {
    console.log("Google Services File from env:", googleServicesFile);
    console.log("All Constants.expoConfig.extra:", Constants.expoConfig?.extra);
  }, []);

  // Configura cómo se mostrarán las notificaciones cuando la app esté en primer plano
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);
  useEffect(() => {
    // Obtener el token del dispositivo
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    // Escucha las notificaciones mientras la app esté en primer plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      }); // Escucha cuando el usuario interactúa con la notificación (clickea en ella)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your Expo Push Token: {expoPushToken}</Text>
      <Text style={{ marginTop: 10 }}>
        Google Services File: {googleServicesFile ? "Loaded" : "Not found"}
      </Text>
      {googleServicesFile && (
        <Text style={{ marginTop: 5, fontSize: 12, color: "gray" }}>
          Length: {googleServicesFile.length} characters
        </Text>
      )}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Send Notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View>
      {notification && (
        <View style={{ marginTop: 20 }}>
          <Text>Last Notification:</Text>
          <Text>{notification.request.content.title}</Text>
          <Text>{notification.request.content.body}</Text>
        </View>
      )}
    </View>
  );
}
// Función para programar una notificación local
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Mira esto! ",
      body: "Este es un mensaje de notificación local.",
      data: { data: "Información adicional" },
    },
    trigger: { seconds: 2 },
  });
}
// Función para registrar el token de notificaciones push
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("¡No se pudieron obtener los permisos de notificaciones!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Debe usar un dispositivo físico para recibir notificaciones push.");
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  console.log(token);
  return token;
}
