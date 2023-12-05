<template>
	<GameHeader />
	<div class="game-container">
		<GameFugure :wrong-letters-count="wrongLetters.length" />
		<GameWrongLetters :wrong-letters="wrongLetters" />
		<GameWord :word="word" :correct-letters="correctLetters" />
	</div>

	<GamePopup ref="popup" :word="word" @restart="restart" />
	<GameNotification ref="notification" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import GameHeader from "./components/GameHeader.vue";
import GameFugure from "./components/GameFugure.vue";
import GameWrongLetters from "./components/GameWrongLetters.vue";
import GameWord from "./components/GameWord.vue";
import GamePopup from "./components/GamePopup.vue";
import GameNotification from "./components/GameNotification.vue";
import { useRandomWord } from "./composables/useRandomWord";
import { useLetters } from "./composables/useLetters";

const { word, getRandomWord } = useRandomWord();
const {
	letters,
	correctLetters,
	wrongLetters,
	isWin,
	isLose,
	addLetter,
	resetLetters,
} = useLetters(word);

const notification = ref<InstanceType<typeof GameNotification> | null>(null);
const popup = ref<InstanceType<typeof GamePopup> | null>(null);

watch(wrongLetters, () => {
	if (isLose.value) {
		popup.value?.openPopup("lose");
	}
});

watch(wrongLetters, () => {
	if (isWin.value) {
		popup.value?.openPopup("win");
	}
});

window.addEventListener("keydown", ({ key }) => {
	if (isLose.value || isWin.value) {
		return;
	}
	if (letters.value.includes(key)) {
		notification.value?.showNotification();
		setTimeout(() => notification.value?.hideNotification(), 2000);
		return;
	}
	addLetter(key);
});

const restart = async () => {
	await getRandomWord();
	resetLetters();
	popup.value?.closePopup();
};
</script>

<style scoped></style>
