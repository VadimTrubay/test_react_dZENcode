import * as Yup from "yup";

export const validationSchemaAddComment = Yup.object({
  text: Yup.string()
    .matches(
      /^(?:(?:[a-zA-Zа-яА-Я0-9\s!@#$%^&*()_\-+=?.,;:<>/"']*(?:<a\s+href="[^"]*"\s+title="[^"]*">.*?<\/a>|<i>.*?<\/i>|<strong>.*?<\/strong>|<code>.*?<\/code>))*[a-zA-Zа-яА-Я0-9\s!@#$%^&*()_\-+=?.,;:<>/"']*)$/i,
      "Invalid format. Allowed HTML tags: <a>, <i>, <strong>, <code>"
    )
    .required("Comment is required")
    .min(4, "Comment must be at least 4 characters")
    .max(1500, "Comment must not exceed 1500 characters"),
});