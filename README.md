# Albumin Diet Portal

## Overview

Albumin Diet is an application that aims to make a music streaming platform (Spotify) less playlist-centric and more album oriented.
With Albumin Diet you can:

* Tag your saved albums with your custom-made tags
* Browse your saved albums by tag
* Save an album in your listening-list and listen to them later

## Try it

Albumin Diet for Web can be found at the following link: www.albumindiet.tk

## Ecosystem

Albumin Diet has born to test the capabilities of several technologies. The whole ecosystem is made of the following applications:

* [albumin-diet-engine](https://github.com/gianlucaparadise/albumin-diet-engine)
  * Backend
* [albumin-diet-portal](https://github.com/gianlucaparadise/albumin-diet-portal) (this repository)
  * Frontend Web
* [albumin-diet-mobapp](https://github.com/gianlucaparadise/albumin-diet-mobapp)
  * Frontend Mobile App

## Tech notes

I used this project to test the capabilities of the following technologies:

* Angular
* Typescript
* Redux pattern (using NgRx)
* GitHub Pages

## Dev notes

To run this application locally, you need to perform the following steps:

1. Clone the repository

```sh
git clone https://github.com/gianlucaparadise/albumin-diet-portal && cd albumin-diet-portal
```

2. Install the dependencies

```sh
yarn install
```

3. Run the app

```sh
yarn start
```

**N.B.** You need to run the *albumin-diet-engine* locally following [this](https://github.com/gianlucaparadise/albumin-diet-engine/blob/master/README.md) guide.