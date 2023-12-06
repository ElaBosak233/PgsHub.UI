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
							<v-icon start icon="mdi-book-multiple" />
							All
						</v-tab>
						<v-tab color="indigo">
							<v-icon start icon="mdi-fingerprint" />
							Misc
						</v-tab>
						<v-tab color="teal">
							<v-icon start icon="mdi-web" />
							Web
						</v-tab>
						<v-tab color="deep-orange">
							<v-icon start icon="mdi-chevron-double-left" />
							Reverse
						</v-tab>
						<v-tab color="blue-grey">
							<v-icon start icon="mdi-pound" />
							Crypto
						</v-tab>
						<v-tab color="purple">
							<v-icon start icon="mdi-matrix" />
							Pwn
						</v-tab>
					</v-tabs>
					<v-divider vertical />
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
								@click="dialog = true"
							/>
							<ChallengeCard
								title="baaaaaaaaase"
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
		<v-dialog v-model="dialog" width="auto">
			<v-card>
				<v-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</v-card-text>
				<v-card-actions>
					<v-btn color="primary" block @click="dialog = false"
						>Close Dialog</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
const dialog = ref(false);
</script>
