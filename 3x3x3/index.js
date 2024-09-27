import "https://cdn.cubing.net/v0/js/cubing/twisty";

for (const moveDisplay of document.querySelectorAll(".move-display")) {
	const twistyPlayer = moveDisplay.querySelector("twisty-player");
	twistyPlayer.hintFacelets = "none";
	twistyPlayer.background = "none";
	twistyPlayer.controlPanel = "none";
	twistyPlayer.experimentalDragInput = "none";
	twistyPlayer.cameraLatitude = 20;
	twistyPlayer.cameraLongitude = 25;

	function flash() {
		twistyPlayer.animate(
			[{ opacity: 1 }, { opacity: 0.2, offset: 0.3 }, { opacity: 1 }],
			{
				duration: 250,
			},
		);
	}

	const firstMoveDuration = (async () =>
		(await twistyPlayer.experimentalModel.indexer.get()).moveDuration(0))();
	twistyPlayer.experimentalModel.timestampRequest.set(firstMoveDuration);

	moveDisplay.addEventListener("mouseenter", () => {
		twistyPlayer.hintFacelets = "floating";
		twistyPlayer.timestamp = 0;
		twistyPlayer.experimentalModel.playingInfo.set({
			playing: true,
			loop: true,
		});
	});
	moveDisplay.addEventListener("click", () => {
		twistyPlayer.hintFacelets = "floating";
		twistyPlayer.timestamp = 0;
		twistyPlayer.pause();
		twistyPlayer.play();
		flash();
	});
	moveDisplay.addEventListener("mouseleave", () => {
		twistyPlayer.hintFacelets = "none";
		twistyPlayer.experimentalModel.playingInfo.set({
			playing: false,
			loop: false,
		});
		twistyPlayer.experimentalModel.timestampRequest.set(firstMoveDuration);
	});
}
