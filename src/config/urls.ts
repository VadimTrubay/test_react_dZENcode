export const auth = "/auth";


export const mainUrls = {
  index: "/",
  id: ":id",
  about: "about",
  comments: "comments",
  terms: "terms",
  notFound: "*",
  auth: {
    signup: `${auth}/signup`,
    signin: `${auth}/signin`,
    me: `${auth}/me`
  },
  // chat: {
  //   messages: `messages`,
  //   all: (skip: number, limit: number) => `${users}?skip=${skip}&limit=${limit}`,
  //   byId: (id: string) => `${users}/${id}`,
  // },
}
