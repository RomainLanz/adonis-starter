<template>
  <!-- Register Panel -->
  <div class="panel panel-default">
    <div class="panel-heading">Register</div>
      <div class="panel-body">

        <div class="alert alert-success" role="alert" v-if="form.successful">
          <strong>Your account has been created with success!</strong>
          <p>You are now able to log you in.</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="register" @keydown="form.errors.reset()" class="form-horizontal" action="/register" method="POST" role="form">

          <!-- Username Field -->
          <div class="form-group">
            <label class="col-md-4 control-label" for="username">Username</label>
            <div class="col-md-6" :class="{ 'has-error': form.errors.has('username') }">
              <input class="form-control" id="username" name="username" type="text" v-model="form.username" required autofocus>

              <span class="help-block" v-show="form.errors.has('username')">
                {{ form.errors.get('username') }}
              </span>
            </div>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <label class="col-md-4 control-label" for="email">E-Mail Address</label>
            <div class="col-md-6" :class="{ 'has-error': form.errors.has('email') }">
              <input class="form-control" id="email" name="email" type="email" v-model="form.email" required>

              <span class="help-block" v-show="form.errors.has('email')">
                {{ form.errors.get('email') }}
              </span>
            </div>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label class="col-md-4 control-label" for="password">Password</label>
            <div class="col-md-6" :class="{ 'has-error': form.errors.has('password') }">
              <input class="form-control" id="password" name="password" type="password" v-model="form.password" required>

              <span class="help-block" v-show="form.errors.has('password')">
                {{ form.errors.get('password') }}
              </span>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="form-group">
            <label class="col-md-4 control-label" for="password_confirmation">Confirm Password</label>
            <div class="col-md-6">
              <input class="form-control" id="password_confirmation" name="password_confirmation" type="password" v-model="form.password_confirmation" required>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-group">
            <div class="col-md-8 col-md-offset-4">
              <button class="btn btn-primary" type="submit" :disabled="form.successful || form.busy">
                <i class="glyphicon glyphicon-ok" v-if="form.successful"></i>
                <i class="glyphicon glyphicon-refresh spinning" v-if="form.busy"></i>
                <span> Register</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  </div>

</template>

<script>
  export default {

    data () {
      return {
        form: new Adonis.Form({
          username: '', email: '',
          password: '', password_confirmation: ''
        })
      }
    },

    methods: {

      /**
       * Sends the register request to the server.
       *
       * @return {void}
       */
      register () {
        this.form.post('/register')
          .then(() => this.form.reset())
          .catch(error => {})
      }

    }

  }
</script>
