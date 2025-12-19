# Voice assistant
This is app that allows to start voice call with AI agent via [Vapi](https://vapi.ai/) and display the full transcript of the conversation after the call ends.

## Prerequisetes
Warning: This SDK cannot be used with Expo Go. Use Expo Development Build or EAS Build.
You would need to generate ios and android project by running 

```bash
npx expo prebuild
npx expo run:ios  # or run:android
```

It is required to add env varibales needed for Vapi
```bash
cp .env.example .env.local # update with your credentials
```
Turbomodules do not work on android you would need to disable new architecture.

## VAPI SDK
In this project making use of [VAPI SDK](https://github.com/VapiAI/client-sdk-react-native/tree/main) it allows to make use of vapi client inside the app.

It is possible to configure assistant to produce summary in the end of conversation that would be displayed after call ended. There is no need to fetch it separately.

## Permissions
iOS automatically handles permissions for protected resources like microphone, however android has to request permissions during runtime.

## Testing
### Anroid specific setup
For testing android app you need to allow usage of micropone in privacy & security.
Select also host micropone access in emulator settings

## Future improvements
While testing noticed that micropone was registering different noise and considered it as input, that would require fine tuning on vapi side and also maybe muting microphone while asssistant talks back.

Support for different languages would be good improvement

Unify permission request and retry for both platforms.

Offline mode where user records audio message that is stored locally and then it is synced to vapi service once connection is stable.
