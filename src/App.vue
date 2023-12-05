<template>
	<GameHeader />
	<div class="game-container">
		<GameFugure />
		<GameWrongLetters />
		<GameWord />
	</div>

	<GamePopup v-if="false" />
	<GameNotification />
</template>

<script setup lang="ts">
import GameHeader from "./components/GameHeader.vue";
import GameFugure from "./components/GameFugure.vue";
import GameWrongLetters from "./components/GameWrongLetters.vue";
import GameWord from "./components/GameWord.vue";
import GamePopup from "./components/GamePopup.vue";
import GameNotification from "./components/GameNotification.vue";
</script>

<style scoped></style>
