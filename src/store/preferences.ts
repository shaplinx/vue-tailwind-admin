import { defineStore } from "pinia";

export type ThemeName =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "cmyk"
  | "autumn"
  | "business"
  | "acid"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter";

export type MenuCompact = boolean;

export const usePreferencesStore = defineStore({
  id: "preferences",
  getters: {
    isMenuCompact: (state) => state.menuCompact,
    isTransitionEnabled: (state) => state.enableTransition,
  },
  state: () => ({
    menuCompact: localStorage.getItem('menuCompact') === 'true' ,
    theme: localStorage.getItem('theme') ?? "light" as ThemeName,
    enableTransition: false as boolean,
  }),
  actions: {
    toggleMenu(state: boolean | undefined = undefined) {
      if (state) {
        return (this.menuCompact = state);
      }
      this.menuCompact = !this.menuCompact;
      localStorage.setItem('menuCompact', this.menuCompact.toString())
    },
    changeTheme(themeName: ThemeName | undefined = undefined) {
      this.theme = themeName ?? this.theme;
      localStorage.setItem('theme',themeName || 'light')
      document.documentElement.setAttribute("data-theme", this.theme);
    },

    toggleTransition(value: boolean | undefined) {
      if (value === undefined) {
        return (this.enableTransition = !this.enableTransition);
      }
      return (this.enableTransition = !!value);
    },
  },
});
