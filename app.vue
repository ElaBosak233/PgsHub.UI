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
import WidthLimitOverlay from "@/components/WidthLimitOverlay.vue";
import { useSnackBarStore } from "@/store/snackBarStore";

const snackBarStore = useSnackBarStore();

const isWidthTooSmall = ref(false);

onMounted(() => {
	window.addEventListener("resize", checkWindowWidth);
	checkWindowWidth();
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", checkWindowWidth);
});

function checkWindowWidth() {
	isWidthTooSmall.value = window.innerWidth < 1265;
}
</script>

<style lang="scss">
#navbar {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
}
</style>
