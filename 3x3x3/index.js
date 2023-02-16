import "https://cdn.cubing.net/js/cubing/twisty";

for (const moveDisplay of document.querySelectorAll(".move-display")) {
	const twistyPlayer = moveDisplay.querySelector("twisty-player");
	twistyPlayer.hintFacelets = "none";
	twistyPlayer.background = "none";
	twistyPlayer.controlPanel = "none";
	twistyPlayer.experimentalDragInput = "none";
	twistyPlayer.cameraLatitude = 20;
	twistyPlayer.cameraLongitude = 25;

	const firstMoveDuration = (async () =>
		(await twistyPlayer.experimentalModel.indexer.get()).moveDuration(0))();
	twistyPlayer.experimentalModel.timestampRequest.set(firstMoveDuration);

	const listener = () => {
		twistyPlayer.hintFacelets = "floating";
		twistyPlayer.timestamp = 0;
		twistyPlayer.experimentalModel.playingInfo.set({
			playing: true,
			loop: true,
		});
	};
	moveDisplay.addEventListener("mouseenter", listener);
	moveDisplay.addEventListener("mouseleave", () => {
		twistyPlayer.hintFacelets = "none";
		twistyPlayer.pause();
		twistyPlayer.experimentalModel.timestampRequest.set(firstMoveDuration);
	});
	moveDisplay.addEventListener("click", listener);
}
