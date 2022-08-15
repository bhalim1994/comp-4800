import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import Heading from "../../UI/typography/Heading";
import SurveyPreview from "../ManageSurvey/Tabs/SurveyPreview";

const SubmissionDetails = () => {
  const { surveyId, submissionId } = useParams();

  return (
    <Box>
      <Heading gutterBottom mb={8}>
        Submission Details
      </Heading>

      <Container maxWidth="md">
        <SurveyPreview
          surveyId={surveyId}
          submissionId={submissionId}
          disabled
        />
      </Container>
    </Box>
  );
};

export default SubmissionDetails;
