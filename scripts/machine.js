//
const volumeIcons = [
	"src/images/svg/volume_off.svg",
	"src/images/svg/volume_mute.svg",
	"src/images/svg/volume_down.svg",
	"src/images/svg/volume_up.svg",
	"src/images/svg/volume_up.svg"
];

//
var player;

var preferences;
var profiles;
var currentProfile;

//
var soundList;

var profileLabel;
var profilePrev;
var profileNext;
var modeBtn;

var repeatBtn;
var volumeBtn;
var volumeInput;
var volumeView;

//
var temp;

//
function wait(duration) {
	return new Promise(function (resolve) {
		setTimeout(() => resolve(), duration);
	});
}

//
function build(pref) {
	window.addEventListener("load", function (event) {
		preferences = pref;
		profiles = [];
		for (let i = 0; i < preferences["profiles"].length; i++) {
			let script = document.createElement("script");
			script.src = `data/profiles/${preferences["profiles"][i]}/profile.jsonp`;

			document.body.appendChild(script);
		}

		soundList.classList.add(pref["view"]);
		currentProfile = pref["initial"];

		setTimeout(async () => { await setProfile(currentProfile) }, 500);
	});
}

function loadProfile(profile) {
	profiles.push(profile);
}

async function setProfile(position) {
	if (temp) return -1;
	temp = true;

	currentProfile = preferences["profiles"].length > 0 ? ((position % preferences["profiles"].length) + preferences["profiles"].length) % preferences["profiles"].length : 0;

	player.pause();
	player.src = "";

	while (soundList.children.length > 0) soundList.children[0].remove();

	if (profiles.length > 0) {
		profileLabel.innerText = profiles[currentProfile]["name"];
		profileLabel.title = profiles[currentProfile]["name"];
		for (let i = 0; i < profiles[currentProfile]["sounds"].length; i++) {
			soundList.appendChild(createItem(profiles[currentProfile]["sounds"][i]));
			await wait(50);
		}
	}

	temp = false;
	return currentProfile;
}

function createItem(item) {
	let profileDir = `data/profiles/${preferences["profiles"][currentProfile]}`;

	let container = document.createElement("div");
	let icon = document.createElement("img");
	let label = document.createElement("span");

	container.classList.add("se-item", "pop");
	icon.classList.add("se-item-icon");
	label.classList.add("se-item-label");

	container.title = item["name"] || item["path"];
	container.addEventListener("click", function (event) {
		player.src = `${profileDir}/sounds/${item["path"]}`;
		player.play();
	});

	icon.src = item["icon"] && item["icon"].length > 0 ? `${profileDir}/icons/${item["icon"]}` : "src/images/svg/music_note.svg";
	if (item["name"] && item["name"].length > 0) label.innerText = item["name"];

	container.appendChild(icon);
	container.appendChild(label);

	setTimeout(function () { container.classList.remove("pop"); }, 50);

	return container;
}

//

document.addEventListener("DOMContentLoaded", function (root_event) {
	player = new Audio();
	player.volume = 1;
	player.currentTime = 0;

	// Elements
	soundList = document.getElementById("se-list");

	profileLabel = document.getElementById("profile-label");
	profilePrev = document.getElementById("profile-prev");
	profileNext = document.getElementById("profile-next");
	modeBtn = document.getElementById("list-mode");

	repeatBtn = document.getElementById("repeat-icon");
	volumeBtn = document.getElementById("volume-icon");
	volumeView = document.getElementById("volume");
	volumeInput = document.getElementById("volume-slider");

	// Custom

	profilePrev.addEventListener("click", async function (event) {
		await setProfile(currentProfile - 1);
	});

	profileNext.addEventListener("click", async function (event) {
		await setProfile(currentProfile + 1);
	});

	modeBtn.src = ["src/images/svg/grid.svg", "src/images/svg/list.svg"][Number(!soundList.classList.contains("buttons"))];
	modeBtn.addEventListener("click", function (event) {
		let bool = soundList.classList.contains("buttons");

		soundList.classList.remove(bool ? "buttons" : "list");
		soundList.classList.add(!bool ? "buttons" : "list");

		modeBtn.src = ["src/images/svg/grid.svg", "src/images/svg/list.svg"][Number(!bool)];
	});

	if (player.loop) repeatBtn.classList.add("enabled");
	else repeatBtn.classList.remove("enabled");
	repeatBtn.addEventListener("click", function (event) {
		player.loop = !player.loop;
		player.src = "";

		if (player.loop) repeatBtn.classList.add("enabled");
		else repeatBtn.classList.remove("enabled");
	});

	volumeBtn.addEventListener("click", function (event) {
		player.muted = !player.muted;
		volumeBtn.src = volumeIcons[Number(!player.muted) * (1 + Math.floor((Number(volumeInput.value) - 1) / 33))];
	});

	volumeInput.addEventListener("input", function (event) {
		let value = Number(event.target.value);

		volumeBtn.src = volumeIcons[Number(!player.muted) * (1 + Math.floor((value - 1) / 33))];
		volumeView.innerText = value;
		player.volume = value / 100;
	});

	document.addEventListener("keydown", function (event) {
		if (event.key == " ") {
			if (player.paused) player.play();
			else player.pause();
		}
	});
});

window.addEventListener("load", function (event) {
	let a = document.getElementById("screen");
	let b = document.getElementById("se-list");

	if (b.classList.contains("buttons")) b.style.width = Math.floor((a.offsetWidth - 112) / 104) * 104 + 96;
});

window.addEventListener("resize", function (event) {
	let a = document.getElementById("screen");
	let b = document.getElementById("se-list");

	if (b.classList.contains("buttons")) b.style.width = Math.floor((a.offsetWidth - 112) / 104) * 104 + 96;
});