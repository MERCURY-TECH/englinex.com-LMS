<template>
        <slot></slot>
</template>

<script setup>


</script>
<style scoped>
body {
  font-family: 'Quicksand', sans-serif;

}
.header-link {
  padding-left:10px !important;
  padding-right:10px !important;
  font-weight: bold;
}

.header-link .nav-link:hover {
  background-color: #FBF3FF !important;
  color: #A01FEF;
  border-bottom: 2px solid #A01FEF;
}

.dropdown-menu {
  background-color: #FBF3FF !important;
  border: none !important;
}

.dropdown-menu .dropdown-item:hover {
  color: #A01FEF;
  border-bottom: 2px solid #A01FEF;
}

.header-link .nav-link:hover .primary-dropdown-arrow {
  color: #000;
  padding-right: 4px;
}

.primary-header-link {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  font-weight: 500;
}

.primary-text {
  color: #A01FEF;
  text-decoration: none;
}

.primary-button {
  background-color: #A01FEF !important;
  border-color: #A01FEF !important;
  color: #fff !important;
}

.primary-button:hover {
  background-color: #fff !important;
  border-color: #A01FEF !important;
  color: #A01FEF !important;
}

.primary-button-outline {
  background-color: transparent !important;
  border-color: #A01FEF !important;
  color: #A01FEF !important;
}

.primary-button-outline:hover {
  background-color: #A01FEF !important;
  border-color: #A01FEF !important;
  color: #fff !important;
}

.primary-border {
  border-color: #A01FEF !important;
}

.dropdown-toggle::after {
  display: none !important;
}

.primary-dropdown-arrow {
  font-weight: 500 !important;
}

.primary-footer {
  background-color: #A01FEF !important;
  color: #fff !important;
}

.top-footer-space {
  background-color: #BC4FFF;
  height: 32.1px;
}

.bottom-footer-space {
  padding: 8px;
}

.footer-form-input {
  border: 1px solid #fff;
  background-color: transparent;
  border-radius: 0;
  color: #fff;
  font-size: 13px;
}

.footer-form-input::placeholder {
  color: #fff;
  opacity: 0.75;
}

.footer-form-input:focus {
  color: #fff;
  background: transparent;
}

.footer-section-title {
  font-weight: bold;
  text-transform: uppercase;
}

.footer-section-menu {
  margin: 0;
  padding: 0;
}

.footer-section-menu li {
  list-style: none;
}

.footer-section-menu li a {
  text-decoration: none;
  color: #fff;
  padding: 0;
  margin:0;
  font-size: 0.8em;
}

.footer-grid-menu {
  margin: 0;
  padding: 0;
}

.footer-grid-menu li {
  list-style: none;
}

.footer-grid-menu li a {
  text-decoration: none;
  color: #fff;
  padding: 0;
  margin:0;
  font-size: 0.8em;
}

.form-control:hover {
  border: 1px solid #e9c5ff !important;
}
.form-control-error {
  border: 1px solid #fa3131 !important;
}

.form-control:focus {
  border: 1px solid #c8a4df !important;
}

</style>
