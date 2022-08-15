import { Button, Container, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import { updateSurvey } from "../../../../services/api/surveyAxios";
import AutoComplete from "../../../controls/AutoComplete";
import CheckBox from "../../../controls/CheckBox";
import TextInput from "../../../controls/Input";
import Card from "../../../UI/Card/Card";
import AppLoader from "../../../UI/loading/AppLoader/AppLoader";
import Status from "../../../UI/Status/Status";
import SubHeading from "../../../UI/typography/SubHeading";
import HelpIcon from "@mui/icons-material/Help";
import { infoButtonStyles } from "../../ManageQuestion/ManageQuestion";
import classes from "../ManageSurvey.module.css";

const surveyTypes = ["Student", "Preceptor", "Graduate", "External"];

const defaultValues = {
  name: "",
  description: "",
  type: surveyTypes[0],
};

const SurveyDetails = ({ surveyId }) => {
  const { response, isLoading, fetchData } = useAxiosGet(
    `/surveys/${surveyId}`
  );
  const { control, reset, handleSubmit } = useForm({ defaultValues });

  useEffect(() => {
    if (!response) return;
    reset(response);
  }, [response, reset]);

  const updateSurveyDetails = async (data) => {
    await updateSurvey(data);
    fetchData(false);
  };

  if (isLoading) return <AppLoader />;

  return (
    <Container maxWidth="md">
      <Card>
        <div className={classes.flexRow}>
          <SubHeading sx={{ mb: 5 }}>Edit Survey</SubHeading>
          <Status
            active={response.active}
            tooltips={[
              "Submissions can be made to this survey.",
              "No submissions can be made to this survey.",
            ]}
          />
        </div>

        <form
          onSubmit={handleSubmit(updateSurveyDetails)}
          className={classes.form}
        >
          <TextInput
            name="name"
            label="Name"
            control={control}
            placeholder="Enter a name"
            fullWidth
          />
          <TextInput
            name="description"
            label="Description"
            control={control}
            placeholder="Enter a description"
            minRows={4}
            fullWidth
            multiline
          />
          <AutoComplete
            options={surveyTypes}
            name="type"
            label="Type"
            control={control}
            fullWidth
          />
          <div>
            <CheckBox control={control} name="active" label="Open" />

            <Tooltip title="A survey taker can only submit a response to your survey if it is open. Surveys are editable regardless of this setting.">
              <IconButton variant="contained" sx={infoButtonStyles}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default SurveyDetails;
