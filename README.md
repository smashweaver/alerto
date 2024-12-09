# Alerto - Personal Time Management App

Alerto is a React Native mobile application developed as a capstone project for the Bachelor of Arts in Multimedia Arts Program at Mapua Malayan College of Mindanao. The app helps users manage their time effectively based on their chronotype (natural sleep-wake cycle patterns), using Firebase for authentication while storing user data locally on their device.

## Project Background

This capstone project demonstrates the practical application of mobile app development skills, focusing on user experience and personal productivity. The app uses Firebase Authentication for user management, while keeping all user data local to ensure privacy and offline functionality.

## Features

- **User Authentication**:
  - Firebase-powered sign up and login
  - Secure user authentication
  - Profile management

- **Chronotype Assessment**: Survey-based determination of user's chronotype:
  - Lion (Early risers)
  - Bear (Follow solar cycle)
  - Wolf (Night owls)
  - Dolphin (Light sleepers)

- **Personalized Schedule**:
  - Customized daily schedules based on chronotype
  - Activity recommendations for optimal productivity
  - Weekly schedule view

- **Activity Management**:
  - Create and edit daily activities
  - Set activity duration and importance
  - Local notifications for scheduled activities

- **User Experience**:
  - Dark theme interface
  - Intuitive navigation
  - Local data persistence
  - Background notifications

## Technology Stack

- **React Native** with Expo framework
- **Firebase Authentication**
  - User registration
  - Login management
  - Profile handling
- **AsyncStorage** for local data persistence
- **React Navigation** for app navigation
- **Expo Notifications** for local notifications
- **Background Tasks** using expo-background-fetch
- **date-fns** for date handling

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## EAS (Expo Application Services)

### Intro to EAS Build
EAS Build is a hosted service for building app binaries for your Expo application. Learn more about EAS Build at:
https://docs.expo.dev/build/introduction/

The app uses EAS for building and distributing Android APKs, making it easier to share the application with users.

### Update the Source Code
Updates can be pushed to existing installations using Expo's update service. View updates at:
https://expo.dev/accounts/capstone_app/projects/alerto/updates

To push an update:
```bash
eas update --branch main
```

### Build the App for Sharing
Build artifacts can be found at:
https://expo.dev/accounts/capstone_app/projects/alerto/builds

To create a new Android build:
```bash
eas build -p android
```

## App Structure

```
alerto/
├── components/       # UI components
│   ├── Activities/  # Activity-related components
│   ├── DateBar/     # Date navigation
│   └── WeekStrip/   # Weekly calendar strip
├── constants/       # App constants and configurations
├── contexts/        # React Context providers
├── hooks/          # Custom React hooks
├── navigation/     # Navigation configuration
├── screens/        # Main app screens
├── styles/         # Styling configurations
├── themes/         # Theme settings
└── utils/          # Helper functions
```

## Key Screens

1. **Survey Screen**
   - Initial chronotype assessment
   - Personalized schedule generation

2. **Home Screen**
   - Daily schedule view
   - Current activity highlight
   - Activity notifications

3. **Schedule Screen**
   - Weekly schedule view
   - Activity management
   - Custom activity creation

4. **Settings Screen**
   - Chronotype management
   - Schedule customization
   - Activity preferences

## Local Data Storage

The app uses AsyncStorage for persistent local data storage:
- User preferences
- Chronotype information
- Custom activities
- Weekly schedules
- Activity history

## Academic Context

This project was developed as part of the requirements for the Bachelor of Arts in Multimedia Arts Program at Mapua Malayan College of Mindanao, demonstrating the application of:

- Mobile Application Development
- User Interface Design
- User Experience Design
- Local Data Management
- Push Notification Systems
- Background Process Management

## Future Enhancements

Potential features for future development:
- Cloud synchronization
- Multi-device support
- Social features
- Activity analytics
- Custom theme creation

## Acknowledgments

Special thanks to:
- Mapua Malayan College of Mindanao
- Department of Multimedia Arts
- Project Advisers
- Beta Testers

## License

This project was developed for academic purposes. All rights reserved.
