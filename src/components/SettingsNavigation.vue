<script setup>
    import { ref, computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import { useDisplay } from 'vuetify'
    import draggable from 'vuedraggable'

    const fhem = useFhemStore()
    const { mobile } = useDisplay()
    const preLang = '_app.settings.navigation.'

	const newItem = ref({
		name: '',
		title: '',
		icon: '',
		group: [],
		groupAsChips: false,
		sort: false,
		divider: false
	})

	const items = ref(fhem.app.config.navigation)

	const path = ref([])

	const pathText = computed(() => {
		let res = [],
			currentPath = JSON.parse(JSON.stringify(path.value))

		while (currentPath.length > 0) {
			currentPath.splice(-1)
			res.unshift(fhem.getEl(fhem.app.config.navigation, currentPath).name)
			currentPath.splice(-1)
		}

		return res.join(' > ')
	})

	function loadGroup(idx) {
		if(idx !== -1) {
			path.value.push(idx, 'group')
		} else {
			path.value.splice(-2)
		}
				
		items.value = fhem.getEl(fhem.app.config.navigation, path.value)
	}

	function updateGroup() {
		fhem.getEl(fhem.app.config.navigation, path.value).splice(0)
		fhem.getEl(fhem.app.config.navigation, path.value).push(...items.value)
	}

	function addItem() {
		items.value.push(newItem.value)
		newItem.value = {
			name: '',
			title: '',
			icon: '',
			group: [],
			groupAsChips: false,
			sort: false,
			divider: false
		}
}
</script>

<template>
    <v-list>	
        <v-list-item :title="$t(preLang + 'title')">
        	<template v-slot:append>
            	<v-icon color="info" @click="fhem.help('navigation')">mdi-help-circle</v-icon>
        	</template>
		</v-list-item>

		<v-list-item v-if="pathText">
			<v-btn variant="text" density="compact" icon="mdi-arrow-up-left" @click="loadGroup(-1)"></v-btn>
			{{ pathText }}
		</v-list-item>

		<v-list-item v-if="items.length > 0">
			<draggable
				v-model="items"
				animation="300"
				handle=".dd_zone"
				item-key="id"
				@change="updateGroup()">
				<template #item={index}>
					<v-row class="align-center pl-3 mr-1 pt-2">
						<v-btn variant="text" icon density="compact" :disabled="items.length > 1 ? false : true" class="dd_zone">
							<v-icon>mdi-drag-vertical</v-icon>
						</v-btn>
						<v-col>
							<v-row>
								<v-col cols="12" lg="4">
									<v-text-field
										v-model="items[index].name"
										variant="outlined"
										density="compact"
										:label="$t(preLang + 'name')"
										:placeholder="$t(preLang + 'namePlaceholder')"
										persistent-placeholder
										hide-details
										clearable>
									</v-text-field>
								</v-col>
								<v-col cols="12" lg="4">
									<v-text-field
										v-model="items[index].title"
										variant="outlined"
										density="compact"
										:label="$t(preLang + 'title1')"
										:placeholder="$t(preLang + 'title1Placeholder')"
										persistent-placeholder
										hide-details
										clearable>
									</v-text-field>
								</v-col>
								<v-col cols="12" lg="4">
									<v-text-field
										v-model="items[index].icon"
										variant="outlined"
										density="compact"
										:label="$t(preLang + 'icon')"
										:placeholder="$t(preLang + 'iconPlaceholder')"
										persistent-placeholder
										:append-inner-icon="items[index].icon"
										hide-details
										clearable>
									</v-text-field>
								</v-col>
							</v-row>
						</v-col>

						<v-col cols="12" lg="3" class="text-right">
							<v-chip v-if="items[index].groupAsChips" size="small" color="info" class="ma-1">xs</v-chip>
							<v-chip v-if="items[index].sort" size="small" color="info" class="ma-1">a-z</v-chip>
							<v-chip v-if="items[index].divider" size="small" color="info" class="ma-1">__</v-chip>

							<v-btn variant="text" density="compact" icon @click="loadGroup(index)" class="mx-3">
								<v-badge v-if="items[index].group.length > 0" color="success" :content="items[index].group.length">
									<v-icon>mdi-arrow-down-right</v-icon>
								</v-badge>
								<v-icon v-if="items[index].group.length < 1">mdi-arrow-down-right</v-icon>
							</v-btn>

							<v-dialog max-width="650px">
								<template v-slot:activator="{ props: activatorProps }">
									<v-btn
										v-bind="activatorProps"
										variant="flat"
										density="compact"
										icon="mdi-dots-vertical">
									</v-btn>
								</template>

  								<template v-slot:default="{ isActive }">
									<v-card>
										<v-sheet color="primary">
											<v-card-title>{{ $t(preLang + 'optionsTitle') }}</v-card-title>
										</v-sheet>
										<v-list lines="two" density="compact">
											<v-list-item :title="$t(preLang + 'optionsChipsTitle')" :subtitle="$t(preLang + 'optionsChips')">
												<template v-slot:append>
													<v-switch v-model="items[index].groupAsChips" color="info" hide-details></v-switch>
												</template>
											</v-list-item>

											<v-list-item :title="$t(preLang + 'optionsSortTitle')" :subtitle="$t(preLang + 'optionsSort')">
												<template v-slot:append>
													<v-switch v-model="items[index].sort" color="info" hide-details></v-switch>
												</template>
											</v-list-item>

											<v-list-item :title="$t(preLang + 'optionsDividerTitle')" :subtitle="$t(preLang + 'optionsDivider')">
												<template v-slot:append>
													<v-switch v-model="items[index].divider" color="info" hide-details></v-switch>
												</template>
											</v-list-item>
										</v-list>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn @click="isActive.value = false" :disabled="false">{{ $t(preLang + 'optionsClose') }}</v-btn>
										</v-card-actions>
									</v-card>
								</template>
							</v-dialog>

							<v-btn variant="text" density="compact" icon="mdi-delete" @click="items.splice(index, 1)" class="ml-3"></v-btn>
						</v-col>
						<v-divider v-if="mobile"></v-divider>
					</v-row>
				</template>
			</draggable>
			<v-divider v-if="!mobile" class="mt-4"></v-divider>
        </v-list-item>
		<v-list-item>
			<v-row class="align-center pl-3 mr-1 pt-2">
				<div class="pl-7"></div>
				<v-col cols="12" lg="">
					<v-text-field
						v-model="newItem.name"
						variant="outlined"
						density="compact"
						:label="$t(preLang + 'name')"
						:placeholder="$t(preLang + 'namePlaceholder')"
						persistent-placeholder
						hide-details
						clearable>
					</v-text-field>
				</v-col>
				<v-col cols="12" lg="">
					<v-text-field
						v-model="newItem.title"
						variant="outlined"
						density="compact"
						:label="$t(preLang + 'title1')"
						:placeholder="$t(preLang + 'title1Placeholder')"
						persistent-placeholder
						hide-details
						clearable>
					</v-text-field>
				</v-col>
				<v-col cols="12" lg="">
					<v-text-field
						v-model="newItem.icon"
						variant="outlined"
						density="compact"
						:label="$t(preLang + 'icon')"
						:placeholder="$t(preLang + 'iconPlaceholder')"
						persistent-placeholder
						:append-inner-icon="newItem.icon"
						hide-details
						clearable>
					</v-text-field>
				</v-col>
				<v-col cols="12" lg="3" class="text-right pr-3">
					<v-btn variant="text" density="compact" icon="mdi-plus" :disabled="!newItem.name" @click="addItem()"></v-btn>
				</v-col>
			</v-row>
		</v-list-item>
    </v-list>
</template>