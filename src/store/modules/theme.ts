import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    theme: (localStorage.getItem('theme') as Theme) || 'light'
  }),

  getters: {
    isDark: (state) => state.theme === 'dark'
  },

  actions: {
    setTheme(theme: Theme) {
      this.theme = theme
      localStorage.setItem('theme', theme)
      this.applyTheme()
    },

    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    },

    initTheme() {
      this.applyTheme()
    },

    applyTheme() {
      if (this.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  },
  persist: true
})
