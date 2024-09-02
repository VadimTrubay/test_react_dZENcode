import {CompanyAddType} from "../types/companiesTypes";
import {
  IPasswordUpdateType,
  UserAuthorizationType,
  IUsernameUpdateType,
  UserRegistrationType
} from "../types/authTypes";
import {IQuizRequestType, QuizByIdResponseType} from "../types/quizzesTypes";


export const initialValues: CompanyAddType = {
  name: "",
  description: "",
  visible: true,
};

export const initialValueUpdateCompany: CompanyAddType = {
  name: "",
  description: "",
  visible: true,
};

export const initialValueUpdateUsername: IUsernameUpdateType = {
  username: "",
};

export const initialValueUpdatePassword: IPasswordUpdateType = {
  password: "",
  new_password: "",
  confirmPassword: "",
};

export const initialValueUserAuthorization: UserAuthorizationType = {
  email: "",
  password: "",
};

export const initialValueUserRegistration: UserRegistrationType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export const initialValueAddQuiz: IQuizRequestType = {
  name: "",
  description: "",
  frequency_days: 0,
  questions: [
    {
      question_text: "",
      correct_answer: [],
      answer_options: ["", ""],
    }
    ,
    {
      question_text: "",
      correct_answer: [],
      answer_options: ["", ""],
    }
  ]
};

export const initialValueEditQuiz: QuizByIdResponseType = {
  id: "",
  name: "",
  description: "",
  frequency_days: 0,
  questions: [
    {
      question_text: "",
      correct_answer: [],
      answer_options: ["", ""],
    }
    ,
    {
      question_text: "",
      correct_answer: [],
      answer_options: ["", ""],
    }
  ]
};