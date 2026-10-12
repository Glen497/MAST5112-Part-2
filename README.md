# Chef's Menu Manager

A simple Expo and React Native app for entering dishes and viewing the current menu.

## Requirements

- Node.js (LTS)
- npm
- Expo Go on a phone, or an Android/iOS simulator

## Run the app

1. Install the dependencies with `npm install`.
2. Start the Expo development server with `npm start`.
3. Scan the QR code using Expo Go, or press `a`/`i` to open an installed simulator.

To check the TypeScript code, run `npm run typecheck`.

## How it works

Complete the dish name, description, course, and price fields, then select **Add Menu Item**. The form displays field-specific validation errors and preserves entered values when invalid. After a valid submission, the app adds the dish to the current menu, displays a confirmation, and updates the dish count. Menu entries are held in application state for the current app session; they are not persisted after restarting the app.
