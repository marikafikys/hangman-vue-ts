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

const word = ref("василий");
const letters = ref<string[]>([]);

const notification = ref<InstanceType<typeof GameNotification> | null>(null);
const popup = ref<InstanceType<typeof GamePopup> | null>(null);
const correctLetters = computed(() =>
	letters.value.filter((el) => word.value.includes(el))
);
const wrongLetters = computed(() =>
	letters.value.filter((el) => !word.value.includes(el))
);
const isLose = computed(() => wrongLetters.value.length === 6);
const isWin = computed(() =>
	[...word.value].every((el) => correctLetters.value.includes(el))
);

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
	if (/[а-яА-ЯёЁ]/.test(key)) {
		letters.value.push(key.toLowerCase());
	}
});

const restart = () => {
	letters.value = [];
	popup.value?.closePopup();
};
</script>

<style scoped></style>
