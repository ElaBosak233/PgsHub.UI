<template>
	<div>
		<div class="d-flex flex-column justify-center align-center mt-4">
			<img
				src="https://img.buuoj.cn/buugirl/img.php"
				alt=""
				width="400"
			/>
			{{ configStore.apiUrl }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/configStore";

const configStore = useConfigStore();
useHead({
	title: "PgsHub",
});
</script>
