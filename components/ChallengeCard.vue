<template>
	<v-card
		class="challenge-card no-select"
		:variant="solved ? 'elevated' : 'tonal'"
		:color="cardColor"
		elevation="3"
		@click="dialog = true"
	>
		<v-card-item>
			<div>
				<div class="text-overline mb-1">
					{{ category }}
				</div>
				<div
					class="text-h6 my-1 font-weight-bold"
					style="
						width: 200px;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					"
				>
					{{ title }}
				</div>
				<v-divider thickness="2" />
				<div class="d-flex flex-wrap justify-space-between">
					<div class="ma-2 pa-2 font-weight-bold">{{ pts }} pts</div>
					<div class="ma-2 pa-2">
						<div class="text-caption my-2">
							{{ solvedTimes }} 次解出
						</div>
					</div>
				</div>
			</div>
		</v-card-item>
		<v-tooltip text="已解决" location="top center">
			<template #activator="{ props: tooltip }">
				<v-icon
					v-show="solved"
					class="check"
					icon="mdi-check"
					style="position: absolute; right: 15px; top: 15px"
					v-bind="tooltip"
				/>
			</template>
		</v-tooltip>
		<v-icon
			size="200"
			style="
				position: absolute;
				right: -20px;
				bottom: -25px;
				z-index: -1;
				opacity: 0.2;
			"
			:icon="icon"
		/>
		<ChallengeDialog
			v-model="dialog"
			:category="category"
			:title="title"
			:pts="pts"
		/>
	</v-card>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/configStore";
const configStore = useConfigStore();

const dialog = ref(false);
interface Props {
	title?: string;
	category?: string;
	solved?: boolean;
	pts?: string;
	solvedTimes?: string;
}

const props = withDefaults(defineProps<Props>(), {
	title: "Unknown Challenge",
	category: "misc",
	solved: false,
	pts: "?",
	solvedTimes: "?",
});
const cardColor = ref(configStore.categoryColors[props.category]);
const icon = ref(configStore.categoryIcons[props.category]);
</script>

<style lang="scss">
.challenge-card {
	width: 275px;
	height: 150px;
}
.container {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
