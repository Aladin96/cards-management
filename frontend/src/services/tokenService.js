import crypto from "crypto";

const secureToken = crypto.randomBytes(20).toString("hex");// إنشاء اسم عشوائي للتوكن localStorage KEY

export const token_name = "authToken";

export const setTokenJwt = (token)=> { 
    // إنشاء إسم عشوائي للتوكن وحفظه في 
    // LocalStorage -> secure-auth; 
    // example : ("secure-auth", "Xsksf6eb9d48eSzfvsd9svz8")
     localStorage.setItem("secure-auth", secureToken);
     //حفظ التوكن في localstorage بالاسم العشوائي
     //EXAMPL : ("Xsksf6eb9d48eSzfvsd9svz8", "JWT-TOKEN")
     localStorage.setItem(secureToken, token)
 } 
 
 export const getTokenJwt = ()=>{
     // إسترجاع التوكن قيمة التوكن
    const secureToken = localStorage.getItem("secure-auth") // إسم التوكن العشوائي
     return localStorage.getItem(secureToken); // استرجاع التوكن
 }

 export const getSecureAuth = () => localStorage.getItem("secure-auth")