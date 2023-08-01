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
              <router-link class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" :to="{ name: 'ViewCourse' }">
                <i class="bi-envelope p-left"></i>
                Inbox
                <span class='badge rounded-pill text-bg-purple h3' style="background-color:#A01FEF; margin-left: 6em;">10</span>
              </router-link>
            </li>
            <li class="nav-item header-link">
              <router-link class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" :to="{ name: 'Settings' }">
                <i class="bi-gear p-left"></i>
                Settings
              </router-link>
            </li>
          </ul>

          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Users Management</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <i class="bi-person"></i>
            </a>
          </h6>
          <ul class="nav flex-column mb-auto">
            
            <li class="nav-item header-link">
              <a class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" href="./customers">
                <i class="bi-people p-left"></i>
                Customers
              </a>
            </li>
            <li class="nav-item header-link">
              <a class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" href="./chatroom">
                <i class="bi-chat-dots p-left"></i>
                Chat Room
              </a>
            </li>
            <li class="nav-item header-link">
              <a class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" href="./calendar">
                <i class="bi-calendar p-left"></i>
                Calendar
              </a>
            </li>
            <li class="nav-item header-link">
              <a class="nav-link d-flex align-items-center gap-2 fw-bold text-dark" href="./help-center">
                <i class="bi-question-circle p-left"></i>
                Help Center
              </a>
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