import { defineStore } from "pinia";
import HTTP from "@/services/api/base"

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

function convertMenuToBool(menu: 'compact' | 'full' | any) {
  return menu === "compact" ? true : false
}

function convertBoolToMenu(bool: boolean | undefined) {
  return bool ? 'compact' : 'full'
}

export const usePreferencesStore = defineStore({
  id: "preferences",
  getters: {
    isMenuCompact: (state) => state.menuCompact,
    isTransitionEnabled: (state) => state.enableTransition,
  },
  state: () => ({
    menuCompact: localStorage.getItem('menuCompact') === 'true' ? true : false,
    theme: localStorage.getItem('theme') ?? "light" as ThemeName,
    enableTransition: false as boolean,
  }),
  actions: {
    toggleMenu(state: boolean | undefined = undefined, mobile : boolean =false) {
      if (!state) {
        state = !this.menuCompact
      }
      if (mobile) {
        this.menuCompact = !this.menuCompact
        return this.menuCompact
      }
      return HTTP.patch('auth/preferences', {
        menu_mode: convertBoolToMenu(state)
      }).then((res) => {
        this.menuCompact = convertMenuToBool(res.data?.data?.menu_mode);
        localStorage.setItem('menuCompact', this.menuCompact.toString())
        return this.menuCompact;
      })
    },
    changeTheme(themeName: ThemeName) {
      
      if(themeName) {
        return HTTP.patch('auth/preferences', {
          theme: themeName
        }).then((res) => {
          this.theme = res.data?.data?.theme ?? this.theme;
          localStorage.setItem('theme', this.theme || 'light')
          document.documentElement.setAttribute("data-theme", this.theme);
          return this.theme;
        })
      } else {
        document.documentElement.setAttribute("data-theme", this.theme);
      }
    },

    toggleTransition(value: boolean | undefined) {
      if (value === undefined) {
        return (this.enableTransition = !this.enableTransition);
      }
      return (this.enableTransition = !!value);
    },
  },
});
