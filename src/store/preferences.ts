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
  },
  state: () => ({
    menuCompact: true as MenuCompact,
    theme: "dark" as ThemeName,
  }),
  actions: {
    toggleMenu(state : boolean | undefined = undefined) {
      if (state) {
        return this.menuCompact = state;
      }
      
      this.menuCompact = !this.menuCompact;
    },
    changeTheme(themeName: ThemeName | undefined = undefined) {
      this.theme = themeName ?? this.theme;
      document.documentElement.setAttribute("data-theme", this.theme);
    },
  }
});
