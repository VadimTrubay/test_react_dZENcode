export const auth = "/auth";


export const mainUrls = {
  index: "/",
  id: ":id",
  about: "about",
  chat: "chat",
  terms: "terms",
  notFound: "*",
  auth: {
    signup: `${auth}/signup`,
    login: `${auth}/login`,
    me: `${auth}/me`
  },
  // chat: {
  //   messages: `messages`,
  //   all: (skip: number, limit: number) => `${users}?skip=${skip}&limit=${limit}`,
  //   byId: (id: string) => `${users}/${id}`,
  // },
}
