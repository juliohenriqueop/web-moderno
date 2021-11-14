import store from "@/configuration/vuex-store"

export default function closeMenuOnSmallDevices() {
  if (window.innerWidth <= 960) {
    store.commit("menu/hide")
  }
}