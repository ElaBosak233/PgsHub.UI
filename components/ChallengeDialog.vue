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
					v-model="instanceEntry"
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
						:disabled="instanceRemovePending"
						:loading="instanceRenewPending"
						color="primary"
						variant="flat"
						class="ml-2"
						@click="renewInstance()"
					>
						<span class="font-weight-bold">延长时间</span>
					</v-btn>
					<v-btn
						v-show="instanceRunning"
						color="red-darken-2"
						variant="flat"
						class="ml-2"
						:loading="instanceRemovePending"
						@click="removeInstance()"
					>
						<span class="font-weight-bold">销毁实例</span>
					</v-btn>
					<v-btn
						v-show="!instanceRunning"
						:color="dialogColor"
						variant="flat"
						class="ml-2"
						:loading="instanceCreatePending"
						@click="createInstance()"
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
	challengeId?: string;
	title?: string;
	description?: string;
	category?: string;
	pts?: string;
	attachment?: string;
	dynamic?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	challengeId: "114514",
	title: "标题",
	description: "",
	category: "misc",
	pts: "200",
	attachment: "",
	dynamic: false,
});

const instanceRunning = ref(false);
const instanceRemovePending = ref(false);
const instanceCreatePending = ref(false);
const instanceRenewPending = ref(false);
const dialogColor = configStore.categoryColors[props.category];
const icon = configStore.categoryIcons[props.category];
const instanceEntry: Ref<string> = ref("");
const instanceId: Ref<string> = ref("");

async function createInstance() {
	interface Response {
		code: number;
		id: string;
		entry: string;
	}
	instanceCreatePending.value = true;
	const { pending, data: res } = await useFetch(
		useRuntimeConfig().public.apiUrl + "/instance/create",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				challenge_id: props.challengeId,
			},
		}
	);
	instanceCreatePending.value = pending.value;
	watch(pending, (newVal) => {
		instanceCreatePending.value = newVal;
	});
	const resObj = res.value as Response;
	if (resObj?.code === 200) {
		instanceEntry.value = resObj?.entry;
		instanceId.value = resObj?.id;
		instanceRunning.value = true;
		snackBarStore.showSnackbar("容器实例已开启", "success");
	} else {
		snackBarStore.showSnackbar("容器实例开启失败", "error");
	}
}

async function removeInstance() {
	instanceRemovePending.value = true;
	const instanceStatus = await getInstanceStatus();
	if (instanceStatus === "running") {
		interface Response {
			code: number;
		}
		const { pending, data: res } = await useFetch(
			useRuntimeConfig().public.apiUrl +
				"/instance/remove?id=" +
				instanceId.value,
			{
				method: "GET",
			}
		);
		instanceRemovePending.value = pending.value;
		watch(pending, (newVal) => {
			instanceRemovePending.value = newVal;
		});
		const resObj = res.value as Response;
		instanceRunning.value = false;
		instanceEntry.value = "";
		if (resObj?.code === 200) {
			snackBarStore.showSnackbar("容器实例移除成功", "success");
		} else {
			snackBarStore.showSnackbar("容器实例移除失败", "error");
		}
	} else {
		instanceRemovePending.value = false;
		instanceRunning.value = false;
		instanceEntry.value = "";
		snackBarStore.showSnackbar("容器实例已被移除", "warning");
	}
}

async function renewInstance() {
	instanceRenewPending.value = true;
	const instanceStatus = await getInstanceStatus();
	if (instanceStatus === "running") {
		interface Response {
			code: number;
		}
		const { pending, data: res } = await useFetch(
			useRuntimeConfig().public.apiUrl +
				"/instance/renew?id=" +
				instanceId.value
		);
		const resObj = res.value as Response;
		instanceRenewPending.value = pending.value;
		watch(pending, (newVal) => {
			instanceRenewPending.value = newVal;
		});
		if (resObj?.code === 200) {
			snackBarStore.showSnackbar("容器实例续期成功", "success");
		} else {
			snackBarStore.showSnackbar("容器实例续期失败", "error");
		}
	} else {
		instanceRenewPending.value = false;
		instanceRunning.value = false;
		instanceEntry.value = "";
		snackBarStore.showSnackbar("容器实例已被移除，无法续期", "warning");
	}
}

async function getInstanceStatus() {
	interface Response {
		code: number;
		status: string;
		entry: string;
	}
	const { data: res } = await useFetch(
		useRuntimeConfig().public.apiUrl +
			"/instance/status?id=" +
			instanceId.value,
		{
			method: "GET",
		}
	);
	const resObj = res.value as Response;
	if (resObj?.code === 200) {
		if (resObj?.status === "running") {
			instanceRunning.value = true;
			instanceEntry.value = resObj?.entry;
			return "running";
		} else if (resObj?.status === "removed") {
			instanceRunning.value = false;
			instanceEntry.value = "";
			return "removed";
		}
	}
}
</script>
