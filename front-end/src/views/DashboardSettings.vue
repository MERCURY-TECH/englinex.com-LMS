<template>
  <DashboardTemplate>
    <div class="container px-md-5">
        <p class="h1 py-3">Settings</p>
        <div class="p-3">
          <div class="row">
            <div class="col-md-7 me-2 mb-3">
              <div class="admin-list bg-body rounded " v-if="adminList">
                <div class="row px-3 pb-2 pt-3" >
                  <div class="col px-3"><p class="h5 fw-bold">Manage Admins</p></div>
                  <div class="col-auto">
                    <p class="h4" style="color: #490194; cursor: pointer;">
                      <i class="bi-plus-circle-fill" @click="toggleAdmins()"></i>
                    </p>
                  </div>
                </div>
                <hr>
                <div class="px-md-4 pb-5">
                  <div class="p-2">
                      <div class="row table-row">
                        <div class="col-2 pt-3 ps-3">
                          <img src="https://github.com/mdo.png" alt="" width="37" height="37" class="rounded-circle me-2">
                        </div>
                        <div class="col-7 pt-2 ps-4" style="border-bottom: 1px solid lightgrey;">
                          <p><small>
                            <span class="fw-bold text-uppercase p-0">Frank Edward</span><br>
                            <span class="text-muted p-0">Role-Name</span>
                          </small></p>
                        </div>
                        <div class="col-3 col-md-2 pt-md-4 pt-3">
                            <p class="rounded table-actions">
                              <a href="" class="primary-text pe-2"><i class="bi-pencil-square"></i></a>
                              <a href="" class="text-danger"><i class="bi-trash-fill"></i></a>
                            </p>
                        </div>
                      </div> 
                  </div>
                </div>
              </div>

              <div v-else class="create-form bg-body rounded ">
                <div class="row px-3 pb-2 pt-3">
                  <div class="col px-3"><p class="h5 fw-bold">Create Admin</p></div>
                  <div class="col-auto"><p class="h4" style="color: crimson;"><i class="bi-x-circle-fill" @click="toggleAdmins"></i></p></div>
                </div>
                <hr>
                <div class="px-md-4 pb-5">
                  <div class="p-2">
                      <form class="row">
                        <div class="col-md-6">
                          <div class="mb-2">
                            <input type="email" name="email" class="form-control" placeholder="Email Address">
                          </div>
                          <div class="mb-2">
                            <input type="password" name="password" class="form-control" placeholder="Password">
                          </div>
                          <div class="mb-2">
                            <input type="password" name="repeat_password" class="form-control" placeholder="Repeat Password">
                          </div>
                          <button class="btn primary-button-outline w-100" type="submit">
                            Create Admin
                          </button>
                        </div>
                        <div class="col-md-6">
                          <div class="mb-5">
                            <label class="fw-bold"><small>Authorization (Role)</small></label>
                            <select name="role" class="form-select mb-5">
                              <option>Select Admin Role</option>
                              <option>Editor</option>
                              <option>Writer</option>
                            </select>
                          </div>
                          <a class="btn primary-button-outline w-100 mt-4">Create New Role</a>
                        </div>
                      </form> 
                  </div>    
                </div>
              </div>
            </div>

            <div class="col-md-4  mb-3">
              <div class="roles-list bg-body rounded " v-if="rolesList">
                <div class="row px-3 pb-2 pt-3 ">
                  <div class="col px-3"><p class="h5 fw-bold">Manage Roles</p></div>
                  <div class="col-auto"><p class="h4" style="color: #490194; cursor: pointer;"><i class="bi-plus-circle-fill" @click="toggleRoles()"></i></p></div>
                </div>
                <hr>  
                <div class="px-3 pb-5">
                  <div class="row table-row">
                    <div class="col-8 pt-3" style="border-bottom: 1px solid lightgrey;">
                      <p>
                        <span class="text-muted">Role-Name</span>
                      </p>
                    </div>
                    <div class="col-4 pt-3" style="border-bottom: 1px solid lightgrey;">
                        <p class="table-actions">
                          <a href="" class="primary-text px-2"><i class="bi-pencil-square"></i></a>
                          <a href="" class="text-danger px-2"><i class="bi-trash-fill"></i></a>
                        </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="create-role bg-body rounded " v-else>
                <div class="row px-3 pb-2 pt-3">
                  <div class="col px-3"><p class="h5 fw-bold">Create Role</p></div>
                  <div class="col-auto"><p class="h4" style="color: crimson; cursor: pointer;"><i class="bi-x-circle-fill" @click="toggleRoles()"></i></p></div>
                </div>
                <hr>
                <div class="px-3 pb-5">
                  <form class="p-3">
                    <div class="mb-3">
                      <input type="text" name="role" class="form-control" placeholder="Role Name" />
                    </div>
                    <div class="mb-3">
                      <textarea name="description" class="form-control" placeholder="Role Description"></textarea>
                    </div>
                    <div class="mb-3">
                      <label class="fw-bold">
                        <small>User permissions</small>
                      </label>
                      <div class="border p-2 row" style="height: 150px; overflow-y: scroll;">
                        <div class="form-check col-6">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                          <label class="form-check-label" for="flexCheckDefault">
                            <small>Default checkbox</small>
                          </label>
                        </div>
                        <div class="form-check col-6">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1">
                          <label class="form-check-label" for="flexCheckDefault1">
                            <small>Default checkbox</small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 text-center">
                      <button class="btn primary-button-outline px-5" type="submit" name="">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </DashboardTemplate>
</template>

<script>
import DashboardTemplate from '../components/DashboardTemplate.vue';

export default {
  name: 'DashboardSettings',
  components: {
    DashboardTemplate,
  },
  props: {
  },
  data() {
    return {
      adminList: true,
      createAdmin: false,
      rolesList: true,
      createRole:false
    }
  },
  methods: {
    toggleAdmins() {
      this.adminList = !this.adminList
    },
    toggleRoles() {
      this.rolesList = !this.rolesList
    }
  }
}
</script>

<style scoped>
  body { background-color: #15223214; }
</style>