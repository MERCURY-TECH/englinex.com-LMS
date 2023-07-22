<template>
    <header class="navbar sticky-top bg-body flex-md-nowrap p-0 shadow-sm">
        <router-link class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 bg-body" to="{ name: 'DashboardHome' }">Englinex</router-link>
        <form class="w-50 d-md-block d-none">
            <input class="form-control rounded-0 border-0" style="cursor: pointer; transition: .2s;" id="searchbar" type="text" placeholder="Search..." aria-label="Search">
        </form>
        <ul class="navbar-nav flex-row">
            <li class="nav-item text-nowrap d-md-none d-block">
            <button class="nav-link px-3 text-muted fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
                <i class="bi-search"></i>
            </button>
            </li>
            <li class="nav-item text-nowrap">
            <a class="nav-link px-md-3 px-sm-2 text-muted fw-bold">
                <i class="bi-chat-dots"></i>
            </a>
            </li>
            <li class="nav-item text-nowrap">
            <a class="nav-link px-3 text-muted fw-bold position-relative">
                <i class="bi-bell"></i>
                <small>
                <span class="position-absolute start-70 translate-middle badge rounded-pill bg-danger" style="top: 75;">
                5</span></small>
            </a>
            </li>
            <li class="nav-item">
            <div class="dropdown-center">
                <a href="./" class="nav-link px-3 pe-md-5 pe-sm-0 nav-item" data-bs-toggle="dropdown" aria-expanded="false" > 
                    <img src="https://github.com/mdo.png" alt="" width="28" height="28" class="rounded-circle me-2">
                    <span class="d-md-inline-block d-none">Hi, Kingsley Romi</span>
                    <small><i class="bi-chevron-down"></i></small>
                </a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start text-small shadow position-absolute">
                    <li><a class="dropdown-item" href="#">New project...</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
            </li>
            <li class="nav-item text-nowrap d-md-none">
            <button class="nav-link px-3 text-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <i class="bi-list"></i>
            </button>
            </li>
        </ul>

        <div id="navbarSearch" class="navbar-search w-100 collapse">
            <input class="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search">
        </div>
    </header>
</template>

<script>
export default {
  name: 'DashboardTopHeader',
  props: {
  }
}
</script>

<style scoped>
    #searchbar:hover {
      border: none !important;
      background-color: #f1f1f1;
    }
  </style>