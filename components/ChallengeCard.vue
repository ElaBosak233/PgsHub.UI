<template>
	<v-card
		class="challenge-card no-select"
		:variant="solved ? 'elevated' : 'tonal'"
		:color="cardColor"
		elevation="3"
	>
		<v-card-item>
			<div class="container">
				<div class="text-overline mb-1">
					{{ category }}
				</div>
				<div class="text-h6 my-1 font-weight-bold">
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
		<v-icon v-show="solved" class="check" icon="mdi-check" />
		<v-icon size="200" class="icon" :icon="icon" />
	</v-card>
</template>

<script setup lang="ts">
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
const cardColor = ref("indigo");
const icon = ref("mdi-fingerprint");

onMounted(() => {
	cardColor.value = getCardColor();
	icon.value = getCategoryIcon();
});
function getCardColor() {
	switch (props.category) {
		case "misc":
			return "indigo";
		case "web":
			return "teal";
		case "crypto":
			return "blue-grey";
		case "reverse":
			return "deep-orange";
		case "pwn":
			return "purple";
		default:
			return "indigo";
	}
}

function getCategoryIcon() {
	switch (props.category) {
		case "misc":
			return "mdi-fingerprint";
		case "web":
			return "mdi-web";
		case "crypto":
			return "mdi-pound";
		case "reverse":
			return "mdi-chevron-double-left";
		case "pwn":
			return "mdi-matrix";
		default:
			return "mdi-fingerprint";
	}
}
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
.icon {
	position: absolute;
	right: -20px;
	bottom: -25px;
	z-index: -1;
	opacity: 0.2;
}
.check {
	position: absolute;
	right: 15px;
	top: 15px;
}
</style>
