# Coding Portfolio

- Mitchell Woodbine
- mitchellwoodbine@gmail.com

## JavaScript

- [Drag-Drop-Resize](https://github.com/vindennl48/CodingPortfolio/tree/master/examples/javascript/drag_drop_resize)
  - A raphael.js canvas style JS front-end application.
  - This project utilized drag-drop so the user could create custom UI elements on the fly.  These elements would be created by selecting a drop-down menu, dragging them into a location on the screen of their choosing, then resized to the user's desired size.  The UI elements could also be set to custom colors.
  - The UI elements would be mapped to an OSC message that would get sent to a back-end server.
  - Link to github: [HipBox_v4](https://github.com/vindennl48/hipbox_v4)
- [ES6](https://github.com/vindennl48/CodingPortfolio/tree/master/examples/javascript/ES6)
  - A minimalistic approach to an audio mixer interface.  This project is all logic that controls an HTML5 page populated by sliders and buttons.
  - Link to github: [HipBox_v7](https://github.com/vindennl48/hipbox/tree/v7.0.0)

## React

- [Audio-Mixer](https://github.com/vindennl48/CodingPortfolio/tree/master/examples/react)
  - A different approach to an audio mixer interface.  This project utilizes React to build volume sliders and buttons in an easy to use interface.
  - Link to github: [HipBox_v6](https://github.com/vindennl48/hipbox)


## Python

- [AudioEngine](https://github.com/vindennl48/CodingPortfolio/tree/master/examples/python)
  - This project is the backend for my HipBox application.
  - This takes in audio data from a USB audio-interface and, with the information collected from the web-app front-end, creates a custom headphone mix for each member of my band.
  - This provides a conduit between a midi footpedal and and OSC client.
  - This takes pre-recorded audio files and plays them back.  (Audio Player)
  - This creates a metronome for the users to play to that can be determined on the fly.  (Plays a high pulse on beat one and a low pulse on subsequent beats.  Can play in various time signatures)
  - This will record all individual musicians as well as record a single audio file that mixes everyone together.  This recording starts when a user presses the record button on the main screen of the front-end UI.
  - Link to github: [HipBox_v6](https://github.com/vindennl48/hipbox)

## CSS/SCSS

- [HipBox_v7](https://github.com/vindennl48/CodingPortfolio/tree/master/examples/css_scss)
  - This project creates the style for the front-end mixer interface.
  - Provides multiple boxes to house volume sliders, mute/solo buttons.
  - Provides a navigation bar
  - Provides styling for a basic Admin interface.
  - Link to github: [HipBox_v7](https://github.com/vindennl48/hipbox/tree/v7.0.0)

## C++

- [AudioEngine](https://github.com/vindennl48/CodingPortfolio/tree/master/examples/C%2B%2B/AudioEngine)
  - This is essentially the same project as the AudioEngine Python project above, however this is completely written in C++.
  - The reason for this is the python project was proving to be too slow for our needs.  My band wanted some more functionality and we really needed more speed to start facilitating some of those new requirements.
  - Link to github: [HipBox_v7](https://github.com/vindennl48/hipbox/tree/v7.0.0)
- [FootPedal](https://github.com/vindennl48/CodingPortfolio/tree/master/examples/C%2B%2B/FootPedal)
  - A fairly in-depth Arduino project.
  - This project controls a custom midi foot pedal.
  - The pedal has 3 foot switches and 3 RGB LED's.
  - This project can blink lights, change colors, recognize press/press-hold actions from the foot switches, as well as navigate multiple sub-menus.
  - Link to github: [MidiStomp](https://github.com/vindennl48/midistomp)

## Bash / Linux

- **Dotfiles**
  - My customization files for my development environment.  I mostly develop on a linux distrobution, currently Arch Linux.
  - Bash coding for loading my environmemt autonomously.
  - Vim / Tmux / i3-gaps
  - I mostly run my development environments in VirtualBox
  - Link to github: [Dotfiles](https://github.com/vindennl48/dotfiles)

## Notable Projects

- **HipBox**
  - Link to github: [HipBox_v7](https://github.com/vindennl48/hipbox/tree/v7.0.0)
  - Link to trello: [Trello Board](https://trello.com/b/yz1ewgcr/hipbox-v7)
  - Link to description: [Description](https://github.com/vindennl48/HipBox/blob/master/README.md)
  - Perhaps my biggest project to date, this has been a work in progress for years now.  I am currently in development of v7 and have recently recruited a second developer to help out with the project.
  - Other notable skills attached to this project that are not noted in the rest of this readme:
    - Ruby on Rails
    - Docker / Docker-Compose
    - SQL / PostgreSQL

## Older Projects

- **BomeMidi Converter (python)**
  - This project would take a dictionary object and compile it into a 'BomeMidi Translator' project file.  For the projects that I was working on, it would take me hours to generate a project file in this software, whereas if I had a python script to generate the project file for me, I could cut that time drastically.
  - 'BomeMidi Translator' is a program that converts midi notes into triggerable events on a computer.
  - Link to github: [BomeMidi](https://github.com/vindennl48/bome_midi)
- **BinPacker (java)**
  - This project was designed to help maximize profit by fitting as many current orders as possible onto a sheet of aluminum for production.  (Used at ClampuSystems.com)
  - Created a few years ago, It was my first time diving into java and into a problem like binpacking.
  - Link to code: [binpacker](https://github.com/vindennl48/BinPacker_DEPRECATED/tree/master/BinPacker/src/binpacker)


