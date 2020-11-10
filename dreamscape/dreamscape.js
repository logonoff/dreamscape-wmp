// dreamscape
// Based off the "Schneider's Eleven" skin for Windows Media Player
// Version 1.06 (2020 November 10)

// Refreshes the UI elements on the control that may need to be updated when a new track
// begins playing: artist, track name, album name, bitrate & file size.
function refreshAll()
{
	// If the player object doesn't exist yet (e.g. when WMP is showing the preview image
	// for this skin), just return without refreshing the contents of any fields.
	if (player == null) {
		return;
	}

	/*
	** Figure out the text for the title line
	*/
	titleText.value = player.currentMedia.name;

	if (titleText.value == "") {
		titleText.value = player.currentMedia.getItemInfo("Title");
	}

	if (titleText.value == "") {
		titleText.value = player.currentMedia.sourceURL;
	}

	/*
	** Figure out the text for the artist line
	*/
	// There could be multiple artists for the current track. Get the count of artists,
	// then build a comma-separated string of the artists, and set that as the artistText.
	var artistCount = player.currentMedia.getAttributeCountByType("artist", "");
	var artistIndex;
	var artistsString = "";

	for (artistIndex = 0; artistIndex < artistCount; artistIndex++) {
		artistsString += player.currentMedia.getItemInfoByType("artist", "", artistIndex);
		// Add the comma delimiter if this isn"t the last item.
		if ((artistIndex + 1) < artistCount) {
			artistsString += ", ";
		}
	}

	artistText.value = artistsString;

	// If we couldn't find artist text, display alternate entries.
	if (artistText.value == "") {
		// We have no artist; see if we can display a band instead.
		if (player.currentMedia.getItemInfo("Band") != "") {
			artistText.value = "[Band] " + player.currentMedia.getItemInfo("Band");
		}

		// We have no band; see if we can display a composer instead.
		else if (player.currentMedia.getItemInfo("WM/Composer") != "") {
			artistText.value = "[Composer] " +  player.currentMedia.getItemInfo("WM/Composer");
		}
		else {
			artistText.value = ""; // give up
		}
	}

	/*
	** Figure out the text for the album line
	*/
	albumText.value = player.currentMedia.getItemInfo("album");

	var bitrate = player.currentMedia.getItemInfo("Bitrate");
	var fileSize = player.currentMedia.getItemInfo("FileSize");

	/*
	** Figure out the text for the bitrate line below the album art
	*/
	// When playing directly from a CD, the bitrate and filesize will come back as 0.
	// Display nothing in the bitrate/filesize field in this case.
	if (bitrate == 0 && fileSize == 0) {
		bitrateAndFilesizeText.value = "";
	}
	else {
		// Build a string with the bitrate of the current track in kpbs.
		// Show up to 2 decimal places, but show as few decimal places as possible.
		// (e.g. the display might be "128 kpbs" or "248.94 kbps")
		var bitrateString = Math.round(bitrate / 10) / 100 + " kbps";

		// Build a string with the filesize in MB of the current track. Always show a single
		// decimal place (e.g. "6.0 MB").
		var filesizeString = (fileSize / 1048576).toFixed(1) + " MB";

		// Display the bitrate and filesize together in their corresponding field.
		bitrateAndFilesizeText.value = bitrateString + " / " + filesizeString;
	}

	// Set the "enabled"/"disabled" state of the Shuffle, Mute, and Repeat buttons.
	repeatEnabledButtonGroup.visible = player.settings.getMode("loop");
	shuffleEnabledButtonGroup.visible = player.settings.getMode("shuffle");
	muteEnabledButtonGroup.visible = player.settings.mute;

	// Update the volume icon to reflect current volume.
	updateVolume();

	// Also refresh the current position and duration information.
	refreshTrackPositionDisplay();
}

// Updates the album art display.
/*
	The following are two hacks that get the album art to (1) display, and (2) display at the proper size,
	in the skin. One is setting the background image of a subview to "WMPImage_AlbumArtSmall"; this appears
	to be a "magic" keyword that will get WMP display the album art. The second hack is to set the
	resizeBackgroundImage property of the subview to true, and to set the art to an empty string before
	setting it to the actual art. (This apparently triggers WMP to display the proper album art, at the
	proper size.) Display of album art in this manner appears to be a little-known trick; as of 9/2007,
	there is only a single Google hit for "WMPImage_AlbumArtSmall" -- a site in Japanese! Slightly more
	info can be gleaned by searching for this keyword in Google Groups; that's where I found the 2nd hack,
	in a post by "Stevie BM":
	https://groups.google.com/g/microsoft.public.windowsmedia.player.skins/c/pwicnHkZbOk?pli=1
*/
function updateAlbumArt()
{
	subview_AlbumArt.backgroundImage = '';
	subview_AlbumArt.backgroundImage = 'WMPImage_AlbumArtSmall';
}

/*
	Refreshes the values of the position slider and the positionAndDurationText.
	This method should be called frequently (i.e. every 50ms) while a track is playing
	to keep the position slider and text updated.
*/
function refreshTrackPositionDisplay()
{
	var currentPositionString = player.controls.currentPositionString;
	if (currentPositionString == "") {
		currentPositionString = "--:--";
	}

	var durationString = player.currentmedia.durationString;
	if (durationString == "") {
		durationString = "--:--";
	}

	var positionAndDurationString = currentPositionString + " / " + durationString;
	positionAndDurationText.value = positionAndDurationString;
}

/*
	Sets the specified text element to scroll if the text in the field is wider
	than the field itself; otherwise, stops the element from scrolling. This function
	is intended to be called on the onMouseOver event of text element controls to
	scroll the text in the control while the mouse is over the control; the onMouseOut
	event should stop the control from scrolling.
*/
function scrollIfNecessary(textElement)
{
	if (textElement.textwidth > textElement.width) {
		textElement.scrolling = true;
		textElement.scrollingAmount = 2;
	}
	else {
		textElement.scrolling = false;
	}
}

// Updates the visible enabled/disabled state of the shuffle and repeat buttons.
function updateShuffleRepeat()
{
	if (player.settings.getMode("shuffle")) {
		shuffleEnabledButtonGroup.visible = true;
	}
	else {
		shuffleEnabledButtonGroup.visible = false;
	}

	if (player.settings.getMode("loop")) {
		repeatEnabledButtonGroup.visible = true;
	}
	else {
		repeatEnabledButtonGroup.visible = false;
	}
}

// Change volume icon depending on current volume
function updateVolume()
{
	muteEnabledButtonGroup.visible = player.settings.mute; // Might as well

	if (player.settings.volume > 64) {
		volTwoGroup.visible = false;
		volOneGroup.visible = false;
	}
	else if (player.settings.volume > 32 && player.settings.volume < 64) {
		volTwoGroup.visible = true;
		volOneGroup.visible = false;
	}
	else if (player.settings.volume < 32) {
		volTwoGroup.visible = false;
		volOneGroup.visible = true;
	}
	else {
		volTwoGroup.visible = false;
		volOneGroup.visible = false;
	}
}
