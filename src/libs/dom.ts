export function closeSideMenu() {
  const drawerToggle = document.querySelector<HTMLInputElement>('#main-drawer');
  if (drawerToggle && drawerToggle.checked) {
    drawerToggle.checked = false;
  }
}
