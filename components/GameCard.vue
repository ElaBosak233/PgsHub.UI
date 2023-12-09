<template>
	<v-card
		class="game-card no-select d-flex"
		elevation="3"
		@click="$router.push('/games/1')"
	>
		<div class="game-cover" />
		<div class="pa-3 d-flex" style="width: 100%">
			<div>
				<div class="d-flex ma-2">
					<v-chip class="ma-1" density="compact">多人赛</v-chip>
					<v-chip class="ma-1" density="compact">8 小时</v-chip>
				</div>
				<div
					class="ml-2 mt-2 text-h5 font-weight-bold"
					style="
						width: 30rem;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					"
				>
					比赛标题
				</div>
				<div
					class="ml-2 mt-2 text-caption"
					style="width: 35rem; height: 2.5rem; overflow: hidden"
				>
					比赛 Bio
				</div>
			</div>
		</div>
		<v-badge
			color="green"
			:inline="true"
			style="position: absolute; right: 10px; top: 12px"
		>
			<v-tooltip activator="parent" location="top center">
				<div>进行中</div>
			</v-tooltip>
		</v-badge>
		<v-icon
			size="200"
			style="
				position: absolute;
				right: 10px;
				bottom: -25px;
				z-index: -1;
				opacity: 0.1;
			"
			icon="mdi-flag"
		/>
	</v-card>
</template>

<script setup lang="ts">
const gameCoverUrl =
	"http://mao.ctf.homes/assets/345e07bc931e95eb94b15ff7951c84a5df16ed9fc6987344445f8b5108307e92/poster";
const gameCoverCss = `url(${gameCoverUrl})`;
</script>

<style lang="scss">
.game-card {
	height: 10rem;
	min-width: 60rem;
	max-width: 60rem;
}
.game-cover {
	display: block;
	width: 25rem;
	height: 10rem;
	background: v-bind(gameCoverCss) center center no-repeat;
	background-size: cover;
}
</style>
