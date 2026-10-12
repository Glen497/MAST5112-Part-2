# MAST5112-Part-2

Chef's Menu Manager is a mobile application for entering dishes, adding them to a menu list, and viewing the current menu with a clean restaurant-inspired design.

## Project overview

This app allows a chef to:

- Enter a dish name
- Add a short description
- Select the course type
- Enter a valid South African Rand price
- Submit the form with validation
- View all added dishes in a scrollable menu list
- See an empty-state message when no menu items exist

## Features included

- Required field validation and clear error messages
- Space-only input rejection for name and description
- Course selection validation
- Positive price validation for decimals such as 89.99
- Success confirmation after valid submission
- Menu count updates automatically
- Empty-state message when the list is empty
- Consistent mobile layout and styling throughout the app

## Run the app

1. Open the project folder in a terminal.
2. Run `npm install`.
3. Run `npm start`.
4. Launch the app with Expo Go, an Android emulator, or an iOS simulator.

## Type check

Run:

```bash
npm run typecheck
```

## Notes

The app stores menu items in local state during the current session. It does not include editing, deletion, search, filtering, or statistics, as those are reserved for the final PoE.
