import { ref } from "vue";
import GameNotification from "../components/GameNotification.vue";

export const useNotification = () => {
	const notification = ref<InstanceType<typeof GameNotification> | null>(null);

	const showNotification = () => {
		notification.value?.showNotification();
		setTimeout(() => notification.value?.hideNotification(), 2000);
	};

	return {
		notification,
		showNotification,
	};
};
