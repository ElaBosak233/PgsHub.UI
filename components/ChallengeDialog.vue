<template>
	<v-dialog style="width: 40%">
		<v-card min-height="300" class="pa-5">
			<div class="d-flex justify-space-between">
				<div class="d-flex">
					<v-icon :color="dialogColor" :icon="icon" />
					<div
						class="font-weight-bold ml-2"
						style="
							width: 20rem;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						"
					>
						{{ title }}
					</div>
				</div>
				<div class="font-weight-bold">{{ pts }} pts</div>
			</div>
			<v-divider class="my-3" />
			<div class="d-flex justify-space-between">
				<div class="description">{{ description }}</div>
				<div>
					<v-btn
						v-if="attachment"
						:color="dialogColor"
						variant="flat"
						icon
						size="small"
					>
						<v-icon icon="mdi-download" />
						<v-tooltip activator="parent" location="bottom center"
							>下载附件</v-tooltip
						>
					</v-btn>
				</div>
			</div>
			<v-spacer class="my-5" />
			<div>
				<v-text-field
					prepend-inner-icon="mdi-server-network"
					hide-details
					density="compact"
					placeholder="容器实例地址"
					:readonly="true"
				/>
			</div>
			<div class="d-flex justify-space-between align-end my-3">
				<div>
					<div class="font-weight-bold text-caption">
						本题为容器题目，解题需开启容器实例
					</div>
					<div class="font-weight-thin text-caption">
						本题容器时间 1200s
					</div>
				</div>
				<div class="d-flex">
					<v-btn
						v-show="instanceRunning"
						color="primary"
						variant="flat"
						class="ml-2"
					>
						<span class="font-weight-bold">延长时间</span>
					</v-btn>
					<v-btn
						v-show="instanceRunning"
						color="red-darken-2"
						variant="flat"
						class="ml-2"
						@click="instanceRunning = !instanceRunning"
					>
						<span class="font-weight-bold">销毁实例</span>
					</v-btn>
					<v-btn
						v-show="!instanceRunning"
						:color="dialogColor"
						variant="flat"
						class="ml-2"
						@click="
							instanceRunning = !instanceRunning;
							snackBarStore.showSnackbar(
								'容器实例已开启',
								'success'
							);
						"
					>
						<span class="font-weight-bold">开启实例</span>
					</v-btn>
				</div>
			</div>
			<v-divider class="my-3" />
			<div class="d-flex align-center">
				<v-text-field
					prepend-inner-icon="mdi-flag"
					hide-details
					density="compact"
					placeholder="Flag"
				/>
				<v-btn :color="dialogColor" variant="flat" class="ml-2">
					<span class="font-weight-bold">提交</span>
				</v-btn>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useSnackBarStore } from "@/store/snackBarStore";
import { useConfigStore } from "@/store/configStore";
const snackBarStore = useSnackBarStore();
const configStore = useConfigStore();

interface Props {
	title?: string;
	description?: string;
	category?: string;
	pts?: string;
	attachment?: string;
	dynamic?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	title: "标题",
	description: "",
	category: "misc",
	pts: "200",
	attachment: "",
	dynamic: false,
});

const instanceRunning = ref(false);
const dialogColor = configStore.categoryColors[props.category];
const icon = configStore.categoryIcons[props.category];
</script>
