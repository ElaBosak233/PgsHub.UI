<template>
	<div>
		<v-sheet
			:height="200"
			min-width="100%"
			color="teal-darken-1"
			class="d-flex justify-center align-center"
			style="z-index: -1; background-size: cover"
		>
			<div class="text-h4">题库</div>
		</v-sheet>
		<div>
			<div style="padding: 3% 5%">
				<div class="d-flex w-full">
					<v-tabs v-model="tab" direction="vertical" style="min-width: 200px">
						<div class="d-flex justify-center px-3">
							<v-text-field
								v-model="searchInput"
								density="compact"
								variant="solo"
								label="搜索"
								bg-color="blue-darken-3"
								append-inner-icon="mdi-magnify"
								:single-line="true"
								:hide-details="true"
								:clearable="true"
								@click:append-inner="search()"
							></v-text-field>
						</div>
						<v-divider class="ma-2" />
						<v-tab value="all" color="primary" @click="challengeStore.loadChallenges(1)">
							<v-icon :start="true" icon="mdi-book-multiple" />
							All
						</v-tab>
						<v-tab value="misc" :color="configStore.categoryColors['misc']" @click="challengeStore.loadChallenges(1, 'category=misc')">
							<v-icon
								:start="true"
								:icon="configStore.categoryIcons['misc']"
							/>
							Misc
						</v-tab>
						<v-tab value="web" :color="configStore.categoryColors['web']" @click="challengeStore.loadChallenges(1, 'category=web')">
							<v-icon
								:start="true"
								:icon="configStore.categoryIcons['web']"
							/>
							Web
						</v-tab>
						<v-tab value="reverse" :color="configStore.categoryColors['reverse']" @click="challengeStore.loadChallenges(1, 'category=reverse')">
							<v-icon
								:start="true"
								:icon="configStore.categoryIcons['reverse']"
							/>
							Reverse
						</v-tab>
						<v-tab value="crypto" :color="configStore.categoryColors['crypto']" @click="challengeStore.loadChallenges(1, 'category=crypto')">
							<v-icon
								:start="true"
								:icon="configStore.categoryIcons['crypto']"
							/>
							Crypto
						</v-tab>
						<v-tab value="pwn" :color="configStore.categoryColors['pwn']" @click="challengeStore.loadChallenges(1, 'category=pwn')">
							<v-icon
								:start="true"
								:icon="configStore.categoryIcons['pwn']"
							/>
							Pwn
						</v-tab>
					</v-tabs>
					<v-divider :vertical="true" />
					<div class="d-flex flex-column flex-1-1">
						<div class="d-flex flex-wrap" style="margin-left: 50px">
							<div v-for="challenge in challengeStore.challenges" :key="challenge?.id">
								<ChallengeCard
									:challenge-id="challenge?.id"
									:title="challenge?.title"
									:category="challenge?.category"
									:description="challenge?.description"
									:duration="challenge?.duration"
									:is-dynamic="challenge?.is_dynamic"
									:has-attachment="challenge?.has_attachment"
									:pts="String(200)"
									:solve="true"
									:solved-times="String(2)"
									class="ma-2 pa-2"
								/>
							</div>
						</div>
						<div class="d-flex justify-center mt-5">
							<v-pagination v-model="challengeStore.currentPage" class="my-4" :length="challengeStore.pages" total-visible="5" @click="pagination()"></v-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/configStore";
import { useChallengeStore } from "@/store/challengeStore";
import { useInstanceStore } from "@/store/instanceStore";
import ChallengeCard from "@/components/challenges/ChallengeCard.vue";

const configStore = useConfigStore();
const challengeStore = useChallengeStore();
const instanceStore = useInstanceStore();

const tab = ref("");
const searchInput = ref("");

challengeStore.loadChallenges(1);
instanceStore.loadExistInstances();

async function search() {
	if (tab.value !== "all") {
		const filters = searchInput.value ? `category=${tab.value}&title=${searchInput.value}` : `category=${tab.value}`;
		await challengeStore.loadChallenges(1, filters);
	} else {
		const filters = searchInput.value ? `title=${searchInput.value}` : ``;
		await challengeStore.loadChallenges(1, filters);
	}
}

async function pagination() {
	await challengeStore.loadChallenges(challengeStore.currentPage, challengeStore.lastFilters);
}
</script>
