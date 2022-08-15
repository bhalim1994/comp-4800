import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import classes from "./Breadcrumbs.module.css";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import rp from "../../../routing/routePaths";
import { useEffect } from "react";
import { Box } from "@mui/material";

const Breadcrumbs = () => {
  const { surveyId, questionId, submissionId } = useParams();

  const { response: survey, fetchData: fetchSurvey } = useAxiosGet(
    `/surveys/${surveyId}`,
    false
  );
  const surveyNameById = {};
  surveyNameById[surveyId] = survey?.name;
  const DynamicSurveyBreadcrumb = ({ match }) => {
    return <span>{surveyNameById[match.params.surveyId]}</span>;
  };

  const questionDetailsById = {};
  questionDetailsById[questionId] = "Question Details";
  const DynamicQuestionBreadcrumb = ({ match }) => {
    return <span>{questionDetailsById[match.params.questionId]}</span>;
  };

  const submissionDetailsById = {};
  submissionDetailsById[submissionId] = "Submission Details";
  const DynamicSubmissionBreadcrumb = ({ match }) => {
    return <span>{submissionDetailsById[match.params.submissionId]}</span>;
  };

  const routes = [
    { path: rp.surveys, breadcrumb: " " },
    { path: rp.manageSurvey, breadcrumb: DynamicSurveyBreadcrumb },
    { path: rp.manageQuestion, breadcrumb: DynamicQuestionBreadcrumb },
    { path: rp.submissionDetails, breadcrumb: DynamicSubmissionBreadcrumb },
    { path: rp.manageUsers, breadcrumb: "Manage Users" },
  ];

  const breadcrumbs = useReactRouterBreadcrumbs(routes);

  useEffect(() => {
    if (!surveyId) return;
    fetchSurvey();
  }, [fetchSurvey, surveyId]);

  return (
    <Box mb={0.5}>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <span key={match.pathname}>
          {index > 0 && breadcrumb.props.children !== " " && <> / </>}
          {index < breadcrumbs.length - 1 ? (
            <NavLink to={match.pathname} className={classes.root}>
              {breadcrumb}
            </NavLink>
          ) : (
            <>{breadcrumb}</>
          )}
        </span>
      ))}
    </Box>
  );
};

export default Breadcrumbs;
