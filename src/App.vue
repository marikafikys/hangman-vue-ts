<template>
	<GameHeader />
	<div class="game-container">
		<GameFugure />
		<GameWrongLetters :wrong-letters="wrongLetters" />
		<GameWord :word="word" :correct-letters="correctLetters" />
	</div>

	<GamePopup v-if="false" />
	<GameNotification ref="notification" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import GameHeader from "./components/GameHeader.vue";
import GameFugure from "./components/GameFugure.vue";
import GameWrongLetters from "./components/GameWrongLetters.vue";
import GameWord from "./components/GameWord.vue";
import GamePopup from "./components/GamePopup.vue";
import GameNotification from "./components/GameNotification.vue";

const word = ref("василий");
const letters = ref<string[]>([]);
const notification = ref<InstanceType<typeof GameNotification> | null>(null);

const correctLetters = computed(() =>
	letters.value.filter((el) => word.value.includes(el))
);
const wrongLetters = computed(() =>
	letters.value.filter((el) => !word.value.includes(el))
);

window.addEventListener("keydown", ({ key }) => {
	if (letters.value.includes(key)) {
		notification.value?.showNotification();
		setTimeout(() => notification.value?.hideNotification(), 2000);
		return;
	}
	if (/[а-яА-ЯёЁ]/.test(key)) {
		letters.value.push(key.toLowerCase());
	}
});
</script>

<style scoped></style>
