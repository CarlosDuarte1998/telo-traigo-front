import { defineStore } from 'pinia'


export const useSectionActiveStore = defineStore({
    id: 'sectionActive',
    state: () => ({
        activeSection: '',
    }),
    actions: {
        setActiveSection(section) {
            this.activeSection = section;
        },
    },
})
