<template>
	<v-dialog width="600">
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
						v-if="hasAttachment"
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
			<div v-if="isDynamic">
				<div>
					<v-text-field
						v-model="instanceEntry"
						prepend-inner-icon="mdi-server-network"
						hide-details
						density="compact"
						placeholder="容器实例地址"
						:single-line="true"
						:readonly="true"
					>
						<template v-if="instanceEntry" #append-inner>
							<v-tooltip location="top center" text="打开">
								<template #activator="{ props: prop }">
									<v-icon icon="mdi-open-in-new" v-bind="prop" @click="redirectTo(instanceEntry)"></v-icon>
								</template>
							</v-tooltip>
						</template>
					</v-text-field>
				</div>
				<div class="d-flex justify-space-between align-end my-3">
					<div>
						<div class="font-weight-bold text-caption">
							本题为动态容器题目，解题需开启容器实例
						</div>
						<div v-if="!instanceRunning" class="font-weight-thin text-caption">
							本题容器时间 {{ duration }}s
						</div>
						<div v-if="instanceRunning" class="font-weight-thin text-caption">
							本题容器剩余时间 {{ instanceRemovedAt - timeNowUnix }}s
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
			</div>
			<v-divider class="my-3" />
			<div class="d-flex align-center">
				<v-text-field
					v-model="flag"
					prepend-inner-icon="mdi-flag"
					hide-details
					density="compact"
					placeholder="Flag"
				/>
				<v-btn :color="dialogColor" variant="flat" class="ml-2" @click="submit()">
					<span class="font-weight-bold">提交</span>
				</v-btn>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useAuthFetch } from "@/composables/useAuthFetch";
import { useSnackBarStore } from "@/store/snackBarStore";
import { useConfigStore } from "@/store/configStore";
import { useInstanceStore } from "@/store/instanceStore";

const snackBarStore = useSnackBarStore();
const configStore = useConfigStore();
const instanceStore = useInstanceStore();

interface Props {
	challengeId?: string;
	title?: string;
	description?: string;
	category?: string;
	isDynamic?: boolean;
	hasAttachment?: boolean;
	duration?: number;
	pts?: string;
	attachment?: string;
	dynamic?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	challengeId: "1",
	title: "标题",
	description: "",
	category: "misc",
	pts: "200",
	attachment: "",
	isDynamic: false,
	duration: 0,
	hasAttachment: false,
});

const instanceRunning = ref(false);
const instanceRemovePending = ref(false);
const instanceCreatePending = ref(false);
const instanceRenewPending = ref(false);
const dialogColor = configStore.categoryColors[props.category];
const icon = configStore.categoryIcons[props.category];
const instanceEntry = ref("");
const instanceId = ref("");
const instanceRemovedAt = ref(0);

const timeNowUnix = ref(0);

const flag = ref("");

watch(instanceStore.existInstances, () => {
	if (props.challengeId in instanceStore.existInstances) {
		instanceRunning.value = true;
		instanceEntry.value = instanceStore.existInstances[props.challengeId]?.entry;
		instanceId.value = instanceStore.existInstances[props.challengeId]?.id;
		instanceRemovedAt.value = instanceStore.existInstances[props.challengeId]?.removed_at;
	}
});

function redirectTo(url: string) {
	window.open(`http://${url}`, "_blank");
}

async function submit() {
	interface Response {
		code: number;
		msg: string;
		status: number;
	}
	const { data: res } = await useAuthFetch(
		`/submissions/`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				"challenge_id": props.challengeId,
				flag
			}
		}
	);
	const resObj = res.value as Response;
	if (resObj?.code === 200) {
		if (resObj?.status === 0) {
			snackBarStore.showSnackbar("答案错误", "warning");
		} else if (resObj?.status === 1) {
			snackBarStore.showSnackbar("答案正确", "success");
		} else if (resObj?.status === 2) {
			snackBarStore.showSnackbar("作弊", "error");
		}
	} else {
		snackBarStore.showSnackbar(resObj.msg, "error")
	}
}

async function createInstance() {
	interface Response {
		code: number;
		id: string;
		entry: string;
		removed_at: number;
	}
	instanceCreatePending.value = true;
	const { pending, data: res } = await useAuthFetch(
		"/instances/",
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
		instanceRemovedAt.value = resObj?.removed_at;
		instanceRunning.value = true;
		snackBarStore.showSnackbar("容器实例已开启", "success");
	} else {
		snackBarStore.showSnackbar("容器实例开启失败", "error");
	}
}

async function removeInstance() {
	instanceRemovePending.value = true;
	const instanceStatus = await getInstanceById();
	if (instanceStatus === "running") {
		interface Response {
			code: number;
		}
		const { pending, data: res } = await useAuthFetch(
				"/instances/",
			{
				method: "DELETE",
				body: {
					"id": instanceId.value
				}
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
	const instanceStatus = await getInstanceById();
	if (instanceStatus === "running") {
		interface Response {
			code: number;
			removed_at: number;
		}
		const { pending, data: res } = await useAuthFetch(
				"/instances/",
			{
				method: "PUT",
				body: {
					"id": instanceId.value
				}
			}
		);
		const resObj = res.value as Response;
		instanceRenewPending.value = pending.value;
		watch(pending, (newVal) => {
			instanceRenewPending.value = newVal;
		});
		if (resObj?.code === 200) {
			instanceRemovedAt.value = resObj?.removed_at;
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

async function getInstanceById() {
	interface Data {
		id: string;
		challenge_id: string;
		entry: string;
		remove_at: string;
		status: string;
	}
	interface Response {
		code: number;
		data: Data
	}
	const { data: res } = await useAuthFetch(
			"/instances/" +
			instanceId.value,
		{
			method: "GET",
		}
	);
	const resObj = res.value as Response;
	if (resObj?.code === 200) {
		if (resObj?.data?.status === "running") {
			instanceRunning.value = true;
			instanceEntry.value = resObj?.data?.entry;
			return "running";
		} else if (resObj?.data?.status === "removed") {
			instanceRunning.value = false;
			instanceEntry.value = "";
			return "removed";
		}
	}
}

function updateTime() {
	timeNowUnix.value = Math.floor(new Date().getTime() / 1000);
}

updateTime();
setInterval(updateTime, 1000);
</script>
