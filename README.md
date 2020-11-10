# dreamscape
Unobtrusive skin for Windows Media Player featuring album art.

This skin is designed not to distract your peripheral vision on a second screen, 
with no distracting scrolling text, animated graphics, or frequently-changing text 
fields (aside from the display of the time index within the current track). It 
always shows the playing album, artist, and track name for at-a-glance viewing.

The skin is inspired by Groove Music.

![dreamscape skin image](https://i.imgur.com/aYpk7Ie.png)

## Feature List
- Relatively small size: 560px wide, 230px high
- Supports audio playback only (no video support)
- Displayed at all times for at-a-glance viewing: Author, Track Title, Album,
  track bitrate, track filesize, track length, track current time index
- Available controls: Play/Pause, Previous Track, Next Track, Mute on/off,
  Shuffle on/off, Repeat on/off, Track position slider, Volume slider
- Displays album art if available, correctly sized/scaled
- Designed for Windows Media Player 12 (WMP 11 & 10 untested, should work)

## Installation Instructions
Download the `.wmz` file from the [releases](https://github.com/logonoff/wmp-dreamscape/releases/), and double-click it.

## Packaging Instructions
1. Compress all files except for `source.psd` into a `.zip`.
2. Rename the archive file extension from `.zip` to `.wmz`.
3. Double click the newly named `.wmz` file.

## Credits/Thanks
- Jon Schneider for the great skin to start off with. Thanks Jon!
- His wife Melissa. I bet he loves her very very much!
- Microsoft, for the free Windows Media Player, the nice Windows Media Player 11 UI,
  and the equally nice skinning API.  XML, Javascript, and image files -- easy!
- Richard Kohut, aka Reeses2150, who created the "Basic6" skin; the TrackInfo pane
  of Basic6 was the initial inspiration for the Schneider's Eleven design.  Thanks Richard!

## Changelog
### **v1.06** - November 10, 2020
- Fix volume slider (didn't work at volumes below 5) and repeat button (didn't work at all)
- Add disabledImage states (reuses down state pictures)
- Use localized button tooltips
- Remove edge case for media over an hour (it has much more space now)
- Change JS formatting
- Remove known issue for large WAVs - a 74.2MB wav in my library correctly displays
  as 74.2MB in WMP 12

### **v1.05** - November 6, 2020
- Initial release
- Increased size of player (is now 560x230)
- Rename to dreamscape (because this is obviously no longer Schneider's)

### **v1.04** - November 11, 2007
- Reduced the size of the player; the width is now 300 pixels (was 340).
- Swapped the positions of the Minimize and Full Mode buttons.
- When a track is being played directly from a CD, "n/a" is now displayed in the
  File size / bitrate field.  (Previously, size and bitrate values of 0 would be  displayed.)
- If the playing track has no information on the author, but does have information
  on the composer, the composer is now displayed.  (Previously, "Unspecified" would be displayed.)

### **v1.03** - October 8, 2007
- All authors of the current track are now displayed in the Author field.
  (Previously, only the first author was displayed.)
- Fixed a bug where the information display for the current track (track name, etc.)
  wouldn't be updated when using the Back/Forward button to move between tracks while
  the player was stopped.
- The decimal places for the bitrate are now displayed only if necessary.  (For
  example, "128 kbps" is now displayed instead of "128.00 kbps".)
- Improved the appearance of the "hover" graphics for the Play/Pause button.

### **v1.02** - October 6, 2007
- Fixed a bug where for certain albums, the player's UI would sometimes hang for a
short time when a track finished and another track started playing.
- Fixed a bug where the Ctrl+T and Ctrl+H shortcut keys were not correctly updating
  the appearance of the Shuffle and Repeat functions.
- Reduced the number of decimal places displayed for the bitrate to 2 (from 3),
  and for the file size to 1 (from 2).

### **v1.01** - September 10, 2007
- Fixed a bug where the time/duration text would not fit into the available display
area if the duration of the current track was an hour long (1:00:00) or longer.

### **v1.0** - September 9, 2007 
- Initial release.
