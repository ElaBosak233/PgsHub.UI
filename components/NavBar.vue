<template>
	<v-toolbar color="blue-darken-4" dark="true">
		<v-toolbar-title class="pl-4">
			<v-chip
				:label="true"
				class="font-weight-bold"
				@click="$router.push('/')"
			>
				PgsHub
			</v-chip>
		</v-toolbar-title>
		<v-toolbar-items>
			<v-btn
				prepend-icon="mdi-bookmark-box-multiple"
				@click="$router.push('/challenges')"
			>
				题库
			</v-btn>
			<v-btn prepend-icon="mdi-flag" @click="$router.push('/games')">
				比赛
			</v-btn>
			<v-btn
				prepend-icon="mdi-account-multiple"
				@click="$router.push('/teams')"
			>
				团队
			</v-btn>
		</v-toolbar-items>
		<v-btn icon>
			<v-icon icon="mdi-hammer-wrench" />
			<v-tooltip activator="parent" location="bottom center"
				>管理</v-tooltip
			>
		</v-btn>
		<v-menu
			v-if="authStore?.pgsToken"
			min-width="200px"
			rounded
			:close-on-content-click="false"
		>
			<template #activator="{ props }">
				<v-btn icon v-bind="props">
					<v-icon icon="mdi-account-circle" />
				</v-btn>
			</template>
			<NavBarUserMenu />
		</v-menu>
		<v-btn v-if="!authStore?.pgsToken" icon @click="$router.push('/login')">
			<v-icon icon="mdi-account-circle" />
		</v-btn>
	</v-toolbar>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
const authStore = useAuthStore();
</script>

<style scoped lang="scss"></style>
