import React, { useState, useEffect } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import Heading from "../../UI/typography/Heading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Tabs from "../../UI/Tabs/Tabs";
import SurveyDetails from "./Tabs/SurveyDetails";
import SurveyPreview from "./Tabs/SurveyPreview";
import SurveyQuestions from "./Tabs/SurveyQuestions";
import classes from "./ManageSurvey.module.css";
import SurveySubmissions from "./Tabs/SurveySubmissions";
import { toast } from "react-toastify";

const tabs = {
  details: 0,
  questions: 1,
  preview: 2,
  submissions: 3,
};

const ManageSurvey = () => {
  const { surveyId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const submissionUrl = `${process.env.REACT_APP_URL}/surveys/${surveyId}/submitSurvey`;
  const [tab, setTab] = useState(tabs[pathname.split("/")[3]]);

  useEffect(() => {
    tabs[pathname.split("/")[3]]
      ? setTab(tabs[pathname.split("/")[3]])
      : setTab(0);
  }, [pathname]);

  const onTabChange = (_, newValue) => {
    if (newValue === tab) return;
    navigate(
      `/surveys/${surveyId}/${Object.keys(tabs).find(
        (k) => tabs[k] === newValue
      )}`
    );
  };

  const renderTab = () => {
    switch (tab) {
      case tabs.details:
        return <SurveyDetails surveyId={surveyId} />;
      case tabs.questions:
        return <SurveyQuestions surveyId={surveyId} />;
      case tabs.preview:
        return <SurveyPreview surveyId={surveyId} />;
      case tabs.submissions:
        return <SurveySubmissions surveyId={surveyId} />;
      default:
        return <SurveyDetails surveyId={surveyId} />;
    }
  };

  const handleShareSurvey = () => {
    navigator.clipboard.writeText(submissionUrl);
    toast.success("Copied survey link to clipboard");
  };

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Heading gutterBottom mb={8}>
          Survey Details
        </Heading>
        <Tooltip title={submissionUrl}>
          <Button variant="outlined" onClick={handleShareSurvey}>
            Share survey
          </Button>
        </Tooltip>
      </Box>

      <Tabs
        labels={["Details", "Questions", "Preview", "Submissions"]}
        margin="30px"
        variant="fullWidth"
        value={tab}
        onChange={onTabChange}
        className={classes.tab}
      />

      {renderTab()}
    </Box>
  );
};

export default ManageSurvey;
