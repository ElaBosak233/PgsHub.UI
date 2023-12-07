<template>
	<Body>
		<NavBar id="navbar" />
		<v-snackbar
			v-model="snackBarStore.snackbar"
			location="right bottom"
			color="transparent"
			variant="tonal"
			:timeout="2000"
		>
			<v-alert
				:text="snackBarStore.text"
				:type="snackBarStore.type"
			></v-alert>
		</v-snackbar>
		<NuxtLayout style="padding-top: 64px">
			<NuxtPage />
		</NuxtLayout>
		<WidthLimitOverlay v-if="isWidthTooSmall" />
	</Body>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import { useSnackBarStore } from "@/store/snackBarStore";
import WidthLimitOverlay from "~/components/WidthLimitOverlay.vue";
const isWidthTooSmall = ref(false);
const snackBarStore = useSnackBarStore();
onMounted(() => {
	window.addEventListener("resize", checkWindowWidth);
	checkWindowWidth();
});
function checkWindowWidth() {
	isWidthTooSmall.value = window.innerWidth < 1265;
}
onBeforeUnmount(() => {
	window.removeEventListener("resize", checkWindowWidth);
});
</script>

<style lang="scss">
#navbar {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
}
</style>
