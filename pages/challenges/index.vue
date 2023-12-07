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
				<div class="d-flex justify-center">
					<v-tabs direction="vertical" style="min-width: 200px">
						<v-tab color="primary" @click="console.log('all')">
							<v-icon :start="true" icon="mdi-book-multiple" />
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
						<v-tab :color="configStore.categoryColors['reverse']">
							<v-icon
								:start="true"
								:icon="configStore.categoryIcons['reverse']"
							/>
							Reverse
						</v-tab>
						<v-tab :color="configStore.categoryColors['crypto']">
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
					<v-divider :vertical="true" />
					<div>
						<div class="d-flex flex-wrap" style="margin-left: 50px">
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
								title="prime"
								category="crypto"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
								solved
							/>
							<ChallengeCard
								title="prime"
								category="crypto"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
							/>
							<ChallengeCard
								title="babystack"
								category="pwn"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
								solved
							/>
							<ChallengeCard
								title="babystack"
								category="pwn"
								pts="200"
								solved-times="1"
								class="ma-2 pa-2"
							/>
							<ChallengeCard class="ma-2 pa-2" />
							<ChallengeCard class="ma-2 pa-2" />
						</div>
						<v-pagination class="my-4" :length="15"></v-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/configStore";
const configStore = useConfigStore();
</script>
