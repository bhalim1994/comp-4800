import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as Switch,
} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Login from "./components/routes/Login/Login";
import Surveys from "./components/routes/Surveys/Surveys";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import rp from "./components/routing/routePaths";
import ManageSurvey from "./components/routes/ManageSurvey/ManageSurvey";
import ManageQuestion from "./components/routes/ManageQuestion/ManageQuestion";
import CreateUser from "./components/routes/CreateUser/CreateUser";
import ManageUsers from "./components/routes/ManageUsers/ManageUsers";
import SubmitSurvey from "./components/routes/SubmitSurvey/SubmitSurvey";
import CompletedSurvey from "./components/routes/CompletedSurvey/CompletedSurvey";
import SubmissionDetails from "./components/routes/SubmissionDetails/SubmissionDetails";
import ForgotPassword from "./components/routes/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/routes/ResetPassword/ResetPassword";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={rp.submitSurvey} element={<SubmitSurvey />} />
        <Route path={rp.completedSurvey} element={<CompletedSurvey />} />

        <Route element={<ProtectedRoute reverse />}>
          <Route path={rp.login} element={<Login />} />
          <Route path={rp.wildCard} element={<Navigate to={rp.login} />} />
          <Route path={rp.forgotPassword} element={<ForgotPassword />} />
          <Route path={rp.resetPassword} element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={rp.manageSurvey} element={<ManageSurvey />} />
            <Route path={rp.manageSurveyDetails} element={<ManageSurvey />} />
            <Route path={rp.manageSurveyQuestions} element={<ManageSurvey />} />
            <Route path={rp.manageSurveyPreview} element={<ManageSurvey />} />
            <Route
              path={rp.manageSurveySubmissions}
              element={<ManageSurvey />}
            />
            <Route path={rp.manageQuestion} element={<ManageQuestion />} />
            <Route path={rp.default} element={<Surveys />} />
            <Route path={rp.surveys} element={<Surveys />} />
            <Route path={rp.createUser} element={<CreateUser />} />
            <Route path={rp.manageUsers} element={<ManageUsers />} />
            <Route
              path={rp.submissionDetails}
              element={<SubmissionDetails />}
            />
            <Route path={rp.wildCard} element={<Navigate to={rp.default} />} />
          </Route>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
