<script setup>
import SignIn from "../components/SignIn.vue";
import { createClient } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
</script>
    
    <template>
  <div class="wrapper" id="signOut">
    <div><SignIn msg="User, please sign in !" /></div>
    <label>email: </label><br />
    <input
      type="email"
      required
      v-model="email"
      placeholder="username@domain.tld"
    /><br />
    <label>password: </label><br />
    <input type="password" required v-model="passwd" /><br />

    <button v-on:click="reset()">Reset</button>
    <button v-on:click="logout()">LogOut</button>
    <p><label id="status"> You are not yet connected </label><br /></p>
  </div>
</template>
    
    <script>
const SUPABASE_URL = "https://ncnkjckpjvogzcxeahvm.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jbmtqY2twanZvZ3pjeGVhaHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzMjkxMzUsImV4cCI6MTk3ODkwNTEzNX0.QV1t05RVYpPDVoIbYbC2ChMXrSdHuSdfd81AEMeqF3E";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default {
  methods: {
    //this method allows a new user to sign up the system. Once done, the user receives an email
    //asking for account validation. Once the validation made the user is added to the system
    async register() {
      try {
        const { user, session, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.passwd,
        });
        if (error) throw error;
        document.getElementById("status").innerHTML =
          "Please validate the received email !";
      } catch (error) {
        alert(error.error_description || error.message);
      }
    },
    //this method allows the already registred user to log in the system.
    async login() {
      try {
        const { user, session, error } = await supabase.auth.signIn({
          email: this.email,
          password: this.passwd,
        });
        if (error) throw error;
        document.getElementById("status").innerHTML = "You are now logged !";
      } catch (error) {
        alert(error.error_description || error.message);
      }
    },
    async reset() {
      // fonction reset mdp
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        this.email
      );
    },
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      document.getElementById("status").innerHTML = "You are now logged out !";
    },
  },
  mounted() {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.update({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  },
};
</script>
    