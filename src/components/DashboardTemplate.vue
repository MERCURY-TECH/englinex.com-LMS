<template>
    <DashboardTopHeader />
    <div class="container-fluid">
        <div class="row">
            <DashboardSideBar />
            <main class="col-md-9 col-lg-10">
				<slot></slot>
            </main>
        </div>
    </div>
</template>

<script>
import DashboardTopHeader from './dashboard/DashboardTopHeader.vue'
import DashboardSideBar from './dashboard/DashboardSideBar.vue'

export default {
  name: 'DashboardTemplate',
  components: {
    DashboardTopHeader,
    DashboardSideBar
  }
}
</script>

<style>
body {
	font-family: 'Quicksand', sans-serif;
	background-color: #15223214; 
}
.header-link {
	font-weight: bold;
}

.header-link .nav-link:hover {
	background-color: #FBF3FF !important;
	color: #A01FEF !important;
	/*border-left: 2px solid #A01FEF;*/
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

.primary-bg {
	background-color: #A01FEF;
	color: #fff;
	text-decoration: none;
}

.primary-bg-subtle {
	background-color: #EFE4FF;
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
	border: 1px solid #c8a4df !important;
}

.form-control:focus {
	border: 1px solid #c8a4df !important;
}

.bi {
  display: inline-block;
  width: 1rem;
  height: 1rem;
}

/*
 * Sidebar
 */

@media (min-width: 768px) {
  .sidebar .offcanvas-lg {
    position: -webkit-sticky;
    position: sticky;
    top: 48px;
  }
  .navbar-search {
    display: block;
  }

  .p-sm-left {
  padding: 0;
  }
}

.sidebar {
	overflow-x: hidden;
}

.sidebar .nav-link {
  font-size: .875rem;
  font-weight: 500;
}

.router-link-active {
  background-color: #FBF3FF !important;
	color: #A01FEF;
	border-left: 2px solid #A01FEF;
}

.router-link-exact-active {
  background-color: #FBF3FF !important;
	color: #A01FEF;
	border-left: 2px solid #A01FEF;
}

.sidebar-heading {
  font-size: .75rem;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
}

.p-left {
	margin-right: 1em !important;
}

.p-sm-left {
	margin-right: 1em !important;
}

.table-row {
	transition: 0.2s;
	background-color: #f9f9f9;
	border-radius: 14px !important;
	margin-bottom: 15px;
}

.table-actions {
	display: none;
	transition: 0.2s;
}

.table-row:hover {
	background-color: #FBF3FF;
}

.table-row:hover .table-actions {
	display: block;
}
</style>