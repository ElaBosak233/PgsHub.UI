<template>
	<v-toolbar color="blue-darken-4" dark="true">
		<v-toolbar-title class="pl-4">
			<v-chip label class="font-weight-bold"> PgsHub </v-chip>
		</v-toolbar-title>
		<v-toolbar-items>
			<v-btn prepend-icon="mdi-bookmark-box-multiple"> 题目 </v-btn>
			<v-btn prepend-icon="mdi-flag"> 比赛 </v-btn>
			<v-btn prepend-icon="mdi-account-multiple"> 团队 </v-btn>
		</v-toolbar-items>
		<v-btn icon>
			<v-icon icon="mdi-hammer-wrench" />
			<v-tooltip activator="parent" location="bottom center"
				>管理</v-tooltip
			>
		</v-btn>
		<v-btn icon>
			<v-icon icon="mdi-account-circle" />
			<v-tooltip activator="parent" location="bottom center"
				>用户</v-tooltip
			>
		</v-btn>
	</v-toolbar>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
