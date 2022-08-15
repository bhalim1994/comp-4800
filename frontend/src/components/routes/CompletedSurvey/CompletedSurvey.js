import React from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Heading from "../../UI/typography/Heading";
import Subtitle from "../../UI/typography/Subtitle";
import { Navigate, useParams } from "react-router-dom";
import useAxiosGet from "../../../hooks/useAxiosGet";
import rp from "../../routing/routePaths";

const CompletedSurvey = () => {
  const { surveyId } = useParams();
  const { response: survey, error } = useAxiosGet(`/surveys/${surveyId}`);

  if (error) return <Navigate to={rp.default} />;
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {survey.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Heading>Survey Completion!</Heading>
        <Subtitle>We received your feedback!</Subtitle>
      </Container>
    </Box>
  );
};

export default CompletedSurvey;
