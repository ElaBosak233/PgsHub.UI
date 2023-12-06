<template>
	<Body>
		<NavBar id="navbar" />
		<NuxtLayout style="padding-top: 64px">
			<NuxtPage />
		</NuxtLayout>
	</Body>
</template>

<script lang="ts" setup>
import NavBar from "~/components/NavBar.vue";
</script>

<style lang="scss">
#navbar {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
}
</style>
