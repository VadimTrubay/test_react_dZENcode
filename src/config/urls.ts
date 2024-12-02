export const auth = "/api-auth";
export const comments = "comments";

export const mainUrls = {
  index: "/",
  id: ":id",
  about: "about",

  terms: "terms",
  notFound: "*",
  auth: {
    signup: `${auth}/signup/`,
    signin: `${auth}/login/`,
    me: `${auth}/me/`
  },
  comments: {
    all: `${comments}/`,
    id: (id: number) => `${id}/`,
    byId: (id: number) => `${comments}/${id}/`,
  },
}
