<template>
	<!-- Header -->
    <nav class="navbar navbar-expand-lg " aria-label="Offcanvas navbar large">
      <div class="container border-bottom py-3 px-5 primary-border">
        <a class="" href="#">Englinex</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbar2Label">Englinex</h5>
            <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item dropdown header-link">
                <a class="nav-link header-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="primary-text primary-dropdown-arrow"><small><i class="bi-chevron-down"></i></small></span> Top
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown header-link">
                <a class="nav-link header-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="primary-text primary-dropdown-arrow"><small><i class="bi-chevron-down"></i></small></span> Categories
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item header-link">
                <a class="nav-link" aria-current="page" href="#">FAQ</a>
              </li>
              <li class="nav-item header-link">
                <a class="nav-link" href="#">About Us</a>
              </li>
              <li class="nav-item primary-header-link px-md-5 primary-text">
                <a class="primary-text fw-bold" href="#">Login</a> | <a class="primary-text fw-bold" href="#">Signup</a>
              </li>
            </ul>
            <div class="d-flex mt-3 mt-lg-0" role="search">
              <input class="form-control form-control-sm me-2 d-none" type="search" placeholder="Search..." id="navbarSearch" aria-label="Search">
              <button class="btn primary-button" onclick="toggleSearchBar()"><i class="bi-search"></i></button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- !Header -->
</template>

<script>
	export default {
		name: 'WebsiteHeader'
	}
</script>