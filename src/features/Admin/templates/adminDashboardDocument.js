/* ==========================================================================
   DOCUMENTO ADMINISTRATIVO | Monta o srcDoc com HTML, CSS e JS separados.
   O conteúdo final é renderizado como texto e executado somente no iframe.
========================================================================== */
import template from "./AdminDashboardTemplate.html?raw";
import styles from "./AdminDashboardTemplate.css?raw";
import runtime from "./AdminDashboardTemplate.js?raw";

export const adminDashboardDocument = template
  .replace("<!-- ADMIN_DASHBOARD_STYLES -->", `<style>\n${styles}\n</style>`)
  .replace("<!-- ADMIN_DASHBOARD_SCRIPT -->", `<script>\n${runtime}\n</script>`);
