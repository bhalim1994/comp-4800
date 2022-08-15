const rp = {
  wildCard: "*",
  default: "/",
  login: "/login",
  surveys: "/surveys", // Do not delete, needed for breadcrumbs to work correctly
  manageSurvey: "/surveys/:surveyId", // Do not delete, needed for breadcrumbs to work correctly
  manageSurveyDetails: "/surveys/:surveyId/details",
  manageSurveyQuestions: "/surveys/:surveyId/questions",
  manageSurveyPreview: "/surveys/:surveyId/preview",
  manageSurveySubmissions: "/surveys/:surveyId/submissions",
  manageQuestion: "/surveys/:surveyId/questions/:questionId",
  createUser: "/manageUsers/createUser",
  manageUsers: "/manageUsers",
  submitSurvey: "/surveys/:surveyId/submitSurvey",
  completedSurvey: "/surveys/:surveyId/completed",
  submissionDetails: "/surveys/:surveyId/submissions/:submissionId",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:passwordResetId",
};

export default rp;
