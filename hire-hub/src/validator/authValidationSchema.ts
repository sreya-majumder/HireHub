import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  name: vine.string().trim().minLength(3).maxLength(30),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20).confirmed(),
  city: vine.string(),
  country: vine.string(),
  number: vine.string(),
  age: vine.string(),
<<<<<<< HEAD
  role : vine.string()
=======
>>>>>>> b712a93d5cd3f76bbf28fdb642d6143de62c9ba2
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6),
})

