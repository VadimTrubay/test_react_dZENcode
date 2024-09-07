export const auth = "/auth";
export const comments = "comments";

export const mainUrls = {
  index: "/",
  id: ":id",
  about: "about",

  terms: "terms",
  notFound: "*",
  auth: {
    signup: `${auth}/signup`,
    signin: `${auth}/signin`,
    me: `${auth}/me`
  },
    comments: {
    all: `${comments}/`,
    byId: (id: number) => `${comments}/${id}/`,
  },
}
