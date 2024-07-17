const {z}=require("zod");
const loginSchema=z.object({
        email:z.
               string({required_error:"email is required"})
               .trim()
               .email({message:"Invalid email adress"})
               .min(3,{message:"email must be at least of 3chars."})
               .max(255,{message:"email must not be more than 255 characters"}),   
        password:z.
               string({required_error:"password is required"})
               .min(7,{message:"password must be at least of 7chars."})
               .max(1024,{message:"password must not be more than 1024 characters"}),
})
const signupSchema=loginSchema.extend({
    username:z.
               string({required_error:"name is required"})
               .trim()
               .min(3,{message:"Name must be at least of 3chars."})
               .max(255,{message:"Name must not be more than 255 characters"}),
    phone:z.
            string({required_error:"phone is required"})
            .trim()
            .min(10,{message:"phone must be at least of 10chars."})
            .max(20,{message:"phone must not be more than 20 characters"}),
});
module.exports={signupSchema,loginSchema};