import{_ as p,o as l,c as d,a as t,t as c,p as m,b as g,d as h,w as r,v as i}from"./index.3a8f6567.js";import{c as w}from"./index.b853457b.js";const _=s=>(m("data-v-5a7d8a65"),s=s(),g(),s),I={class:"greetings"},b={class:"green"},y=_(()=>t("h3",null," Change the world with your words !!! ",-1)),S={__name:"SignIn",props:{msg:{type:String,required:!0}},setup(s){return(o,e)=>(l(),d("div",I,[t("h1",b,c(s.msg),1),y]))}};var v=p(S,[["__scopeId","data-v-5a7d8a65"]]);const f={class:"wrapper",id:"signOut"},C=t("label",null,"email: ",-1),E=t("br",null,null,-1),k=t("br",null,null,-1),M=t("label",null,"password: ",-1),V=t("br",null,null,-1),O=t("br",null,null,-1),U=t("p",null,[t("label",{id:"status"}," You are not yet connected "),t("br")],-1),Y="https://ncnkjckpjvogzcxeahvm.supabase.co",B="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jbmtqY2twanZvZ3pjeGVhaHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzMjkxMzUsImV4cCI6MTk3ODkwNTEzNX0.QV1t05RVYpPDVoIbYbC2ChMXrSdHuSdfd81AEMeqF3E",a=w(Y,B),j={methods:{async register(){try{const{user:s,session:o,error:e}=await a.auth.signUp({email:this.email,password:this.passwd});if(e)throw e;document.getElementById("status").innerHTML="Please validate the received email !"}catch(s){alert(s.error_description||s.message)}},async login(){try{const{user:s,session:o,error:e}=await a.auth.signIn({email:this.email,password:this.passwd});if(e)throw e;document.getElementById("status").innerHTML="You are now logged !"}catch(s){alert(s.error_description||s.message)}},async reset(){await a.auth.api.resetPasswordForEmail(this.email)},async logout(){const{error:s}=await a.auth.signOut();if(s)throw s;document.getElementById("status").innerHTML="You are now logged out !"}},mounted(){a.auth.onAuthStateChange(async(s,o)=>{if(s=="PASSWORD_RECOVERY"){const e=prompt("What would you like your new password to be?"),{data:n,error:u}=await a.auth.update({password:e});n&&alert("Password updated successfully!"),u&&alert("There was an error updating your password.")}})}},z=Object.assign(j,{__name:"emailLogin",setup(s){return(o,e)=>(l(),d("div",f,[t("div",null,[h(v,{msg:"User, please sign in !"})]),C,E,r(t("input",{type:"email",required:"","onUpdate:modelValue":e[0]||(e[0]=n=>o.email=n),placeholder:"username@domain.tld"},null,512),[[i,o.email]]),k,M,V,r(t("input",{type:"password",required:"","onUpdate:modelValue":e[1]||(e[1]=n=>o.passwd=n)},null,512),[[i,o.passwd]]),O,t("button",{onClick:e[2]||(e[2]=n=>o.register())},"Sign Up"),t("button",{onClick:e[3]||(e[3]=n=>o.login())},"Sign In"),t("button",{onClick:e[4]||(e[4]=n=>o.reset())},"Reset"),t("button",{onClick:e[5]||(e[5]=n=>o.logout())},"LogOut"),U]))}});export{z as default};
