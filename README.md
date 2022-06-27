# Team Name
Fanta Beauty


# Level of Achievement
Apollo 11


# Motivation
Have you ever peeked into your shopping cart and thought: “Will this look nice on me!”? Spent a few hours on websites scrolling through pages of listings but failed to find the perfect piece? Are you constantly doubting your fashion decisions, wondering if it’s fit for your body type?

It is not rare for online shoppers to regret their fashion purchases due to inaccurate size charts, wasting their money on returning unfit clothing. Some may also need the clothes urgently for special occasions and hence cannot afford wasting time on making an exchange. Unlike in physical stores where shoppers can easily try on clothes, online shoppers would have to take their own measurements, which is more inconvenient and difficult to visualize. Living in a fast-paced society, people are bombarded by their hectic schedules, so they have no time to research fashion trends and build better outfits.


# Aim
We aim to help users purchase fitting and ideal fashion apparel online in a quick and fuss-free way.


# About Fanta Beauty
Fanta Beauty is a fashion platform that helps users purchase fitting and ideal fashion apparel online in a quick and fuss-free way. It provides the users a virtual fitting room with the implementation of a clothes scanner and a virtual model, for our target audience to try on clothes virtually, such that they can make wise purchases. You can easily add clothes in the wishlist and get fashion tips as well as information on the latest trends.


# Features
## Authentication pages
**Welcome Screen**

When logged out, users will be first directed to the Welcome Screen, where they can choose to navigate to the Register Screen for first-time users, or to the Login Screen if they already have an account.

**Register Screen**

New users can create a new account using a valid email address and set a username and password. This feature is backed with Firebase authentication.

**Login Screen**

Users can log in to the app using their email address and password.

**Forgot Password Screen**

Users who wish to forget their password will receive an OTP sent to their email address, provided an account exists under that address.


## Home Screen + Bottom Tab Navigator
The **Home page** will be the default page that logged in users will first see. It displays an image carousel of trending clothing items which directs users to the corresponding shopping page upon clicking to serve as fashion recommendations.

The **Bottom Tab Navigator** provides quick access to the basic pages: Home Screen, Try-On Screen and Profile Screen.


## Profile Pages
**Profile Screen**

A customizable page that displays the users’ profile picture and username, and provides users with quick access to our key features, such as my body (for adjusting body measurements) , saved looks (for saving ‘liked’ outfits on the model) and wishlist pages (for saving uploaded pictures) , as well as the option to log out of their account.

**Edit Profile Screen**

Allows users to change their profile picture and username to make the account more customized to each user.


## Wishlist Screen
Stores all the screenshots of the clothes uploaded by the users, which are clickables directed to the model donning the outfit for quick visualization.


## Model Pages
*(yet to be implemented fully)*

**Model Screen**

Users can try on a model with measurements tailored to their own. Buttons are also included in the page for quick direct access to complementing features, such as the clothes scanner and measurement updates pages. 

**My Body Screen**

The model size, such as height, shoulder, and waist can be adjusted in the My Body page, such that it looks similar to the user’s body for realistic visualization of the clothes.


# Technical Proof of Concept
## Executing the program
Install npm/yarn on https://nodejs.org/en/  or https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable

Download zip from this github repository https://github.com/fannyjian/fanta-beauty.

On your terminal, change to the directory fanta-beauty-main and run:
‘npm install’ or ‘yarn install’
‘npm start’ or ‘yarn start’

Download the Expo app on your iPhone.

Scan the QR code with an iPhone camera and you will be redirected to the Expo app.


## Front-end
We used React Native to code out our app, and Expo to run our app on an iPhone simulator.


## Back-end
We used Firebase authentication and cloud storage, as well as Firestore as our firebase.
