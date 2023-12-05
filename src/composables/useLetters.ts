import { ref, computed, type Ref } from "vue";

export const useLetters = (word: Ref<string>) => {
	const letters = ref<string[]>([]);
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
	const addLetter = (key: string) => {
		if (/[а-яА-ЯёЁ]/.test(key)) {
			letters.value.push(key.toLowerCase());
		}
	};
	const resetLetters = () => {
		letters.value = [];
	};

	return {
		letters,
		correctLetters,
		wrongLetters,
		isWin,
		isLose,
		addLetter,
    resetLetters
	};
};
