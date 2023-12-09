<template>
	<div>
		<v-sheet
			:height="300"
			min-width="100%"
			color="teal-darken-1"
			class="d-flex justify-center align-center"
			style="z-index: -1; background-size: cover"
		>
			<div
				class="d-flex justify-center no-select"
				style="min-width: 100%"
			>
				<div class="game-cover-2 mr-5" />
				<div style="width: 30%">
					<div class="d-flex ma-2">
						<v-chip class="ma-1" density="compact">多人赛</v-chip>
						<v-chip class="ma-1" density="compact">8 小时</v-chip>
					</div>
					<p class="text-h4 font-weight-bold">
						第六届浙江省大学生网络与信息安全竞赛初赛
					</p>
					<p class="text-caption">13 支队伍已报名</p>
					<div class="d-flex justify-space-between mt-2">
						<div>
							<p class="text-caption">开始时间</p>
							<p class="font-weight-bold">
								18:22:58, November 04, 2023
							</p>
						</div>
						<div>
							<p class="text-caption">结束时间</p>
							<p class="font-weight-bold">
								18:22:58, November 04, 2023
							</p>
						</div>
					</div>
					<v-progress-linear
						model-value="10"
						color="white"
						height="10"
						:striped="true"
					/>
				</div>
			</div>
		</v-sheet>
		<div>
			<div style="padding: 3% 5%">
				<div class="d-flex">
					<div>
						<div class="d-flex justify-center">
							<v-btn
								prepend-icon="mdi-cloud-upload"
								variant="flat"
								color="blue-darken-3"
							>
								提交 Write Up
							</v-btn>
						</div>
						<v-divider class="ma-2" />
						<v-tabs direction="vertical" style="min-width: 200px">
							<v-tab color="primary" @click="console.log('all')">
								<v-icon
									:start="true"
									icon="mdi-book-multiple"
								/>
								All
							</v-tab>
							<v-tab :color="configStore.categoryColors['misc']">
								<v-icon
									:start="true"
									:icon="configStore.categoryIcons['misc']"
								/>
								Misc
							</v-tab>
							<v-tab :color="configStore.categoryColors['web']">
								<v-icon
									:start="true"
									:icon="configStore.categoryIcons['web']"
								/>
								Web
							</v-tab>
							<v-tab
								:color="configStore.categoryColors['reverse']"
							>
								<v-icon
									:start="true"
									:icon="configStore.categoryIcons['reverse']"
								/>
								Reverse
							</v-tab>
							<v-tab
								:color="configStore.categoryColors['crypto']"
							>
								<v-icon
									:start="true"
									:icon="configStore.categoryIcons['crypto']"
								/>
								Crypto
							</v-tab>
							<v-tab :color="configStore.categoryColors['pwn']">
								<v-icon
									:start="true"
									:icon="configStore.categoryIcons['pwn']"
								/>
								Pwn
							</v-tab>
						</v-tabs>
					</div>
					<v-divider :vertical="true" />
					<div>
						<div
							class="d-flex flex-wrap"
							style="
								margin-left: 25px;
								margin-right: 25px;
								width: 55rem;
							"
						>
							<ChallengeCard
								title="ezphp"
								category="web"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
								solved
							/>
							<ChallengeCard
								title="ezphp"
								category="web"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
							/>
							<ChallengeCard
								title="baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaase"
								category="misc"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
								solved
							/>
							<ChallengeCard
								title="baaaaaaaaase"
								category="misc"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
							/>
							<ChallengeCard
								title="ezre"
								category="reverse"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
								solved
							/>
							<ChallengeCard
								title="ezre"
								category="reverse"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
							/>
							<ChallengeCard
								title="ezphp"
								category="web"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
								solved
							/>
							<ChallengeCard
								title="ezphp"
								category="web"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
							/>
							<ChallengeCard
								title="baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaase"
								category="misc"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
								solved
							/>
							<ChallengeCard
								title="baaaaaaaaase"
								category="misc"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
							/>
							<ChallengeCard
								title="ezre"
								category="reverse"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
								solved
							/>
							<ChallengeCard
								title="ezre"
								category="reverse"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
							/>
						</div>
						<v-pagination class="my-4" :length="5"></v-pagination>
					</div>
					<v-divider :vertical="true" />
					<div style="padding-left: 45px">
						<TeamInfoCard />
						<NotificationCard class="my-5" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/configStore";
import TeamInfoCard from "~/components/TeamInfoCard.vue";
const configStore = useConfigStore();
const gameCoverUrl =
	"http://mao.ctf.homes/assets/345e07bc931e95eb94b15ff7951c84a5df16ed9fc6987344445f8b5108307e92/poster";
const gameCoverCss = `url(${gameCoverUrl})`;
</script>

<style lang="scss">
.game-cover-2 {
	box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.3);
	display: block;
	width: 25rem;
	height: auto;
	border-radius: 10px;
	background: v-bind(gameCoverCss) center center no-repeat;
	background-size: cover;
}
</style>
