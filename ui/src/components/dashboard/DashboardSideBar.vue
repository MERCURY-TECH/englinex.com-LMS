<template>
    <div class="sidebar col-md-3 col-lg-2 p-0 bg-body">
      <div class="offcanvas-lg offcanvas-end bg-body" style="height: 100vh;" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="sidebarMenuLabel">Englinex</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul class="nav flex-column">
            <li class="nav-item header-link">
              <router-link class="nav-link d-flex align-items-center gap-2 active fw-bold text-dark" aria-current="page" :to="{ name: 'DashboardHome' }">
                <i class="bi-house p-left"></i>
                Home
              </router-link>
            </li>
            <li class="nav-item header-link">
              <router-link class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" :to="{ name: 'Courses' }">
                <i class="bi-bar-chart-line p-left"></i>
                Courses
                <span class='badge rounded-pill text-bg-purple h3' style="background-color:#A01FEF; margin-left: 4.5em;">10</span>
              </router-link>
            </li>
            <li class="nav-item header-link">
                <router-link class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" :to="{ name: 'StudentList'}">
                  <i class="bi-people p-left"></i>
                  Students
                </router-link>
              </li>
            <li class="nav-item header-link">
                <router-link class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" :to="{ name: 'PlatformTeachers'}">
                  <i class="bi-people p-left"></i>
                  Teachers
                </router-link>
              </li>
            <li class="nav-item header-link">
                <router-link class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" :to="{name:'PlatformBundles'}">
                  <i class="bi bi-bag p-left"></i>
                  Bundles
                </router-link>
              </li>
            <li class="nav-item header-link">
                <router-link class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" :to="{name:'PlatformTransaction'}">
                  <i class="bi bi-body-text p-left"></i>
                  Transaction
                </router-link>
              </li>
            <li class="nav-item header-link">
                <a class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" href="./">
                  <i class="bi bi-calendar3 p-left"></i>
                  Schedules
                </a>
              </li>
            <li class="nav-item header-link">
              <router-link class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" :to="{ name: 'Settings' }">
                <i class="bi-gear p-left"></i>
                Settings
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DashboardSideBar',
  props: {
  }
}
</script>

<style scoped>
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
</style>