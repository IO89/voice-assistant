# Voice assistant
This is app that allows to start voice call with AI agent via [Vapi](https://vapi.ai/) and display the full transcript of the conversation after the call ends.

## Prerequisetes
> Warning: This SDK cannot be used with Expo Go. Use Expo Development Build or EAS Build.
> You would need to generate ios and android project by running 

```bash
npx expo prebuild
npx expo run:ios  # or run:android
```

It is required to add env varibales needed for Vapi
```bash
cp .env.example .env.local # update with your credentials
```
> Turbomodules do not work on android you would need to disable new architecture
