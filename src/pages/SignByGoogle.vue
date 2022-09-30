<script setup>
import SignIn from "../components/SignIn.vue";
import { createClient } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

supabase.auth.onAuthStateChange((event, session) => {
  if (session == null) {
    document.getElementById("status").innerHTML = "You are not logged !!!";
  } else {
    //alert('session value: ' + JSON.stringify(session))
    document.getElementById("status").innerHTML =
      "You are logged with the email: " + session.user.email;
  }
});
</script>
    
<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>Please login if you have an account or register :</p>
    <button @click="login()">Sign In With Google</button><br />
    <button @click="signInWithGithub()">Sign In With GitHub</button><br />
    <button @click="logout()">Sign Out</button><br />
    <label id="status">You are not yet logged ! </label>
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
          provider: "google",
        });
        if (error) throw error;
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
      try {
        const { user, session, error } = await supabase.auth.signOut();
        if (error) throw error;
        document.getElementById("status").innerHTML = "You are disconnected !";
      } catch (error) {
        alert(error.error_description || error.message);
      }
    },
    async signInWithGithub() {
      const { user, session, error } = await supabase.auth.signIn({
        provider: "github",
      });
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
    