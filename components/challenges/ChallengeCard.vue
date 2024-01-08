<template>
	<v-card
		class="challenge-card no-select"
		:variant="solved ? 'elevated' : 'tonal'"
		:color="cardColor"
		elevation="3"
		@click="dialog = true;"
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
					<div class="d-flex justify-center align-center">
						<v-rating
							:readonly="true"
							:length="5"
							:size="24"
							:model-value="difficulty"
						/>
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
			:challenge-id="challengeId"
			:description="description"
			:category="category"
			:title="title"
			:pts="pts"
			:is-dynamic="isDynamic"
			:has-attachment="hasAttachment"
			:duration="duration"
			:difficulty="difficulty"
		/>
	</v-card>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/configStore";
import ChallengeDialog from "@/components/challenges/ChallengeDialog.vue";
const configStore = useConfigStore();

const dialog = ref(false);
interface Props {
	challengeId?: string;
	title?: string;
	category?: string;
	description?: string;
	isDynamic?: boolean;
	hasAttachment?: boolean;
	duration?: number;
	solved?: boolean;
	pts?: string;
	solvedTimes?: string;
	difficulty?: number;
}

const props = withDefaults(defineProps<Props>(), {
	challengeId: "",
	title: "",
	category: "misc",
	description: "",
	isDynamic: false,
	hasAttachment: false,
	duration: 0,
	solved: false,
	pts: "?",
	solvedTimes: "?",
	difficulty: 0,
});

const cardColor = ref(configStore.categoryColors[props.category]);
const icon = ref(configStore.categoryIcons[props.category]);
</script>

<style scoped lang="scss">
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
