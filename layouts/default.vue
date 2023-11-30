<template>
	<main>
		<NavBar style="position: fixed" />
		<slot />
	</main>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>
