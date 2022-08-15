import React from "react";
import Heading from "../../UI/typography/Heading";
import { Button } from "@mui/material";
import Input from "../../controls/Input";
import AutoComplete from "../../controls/AutoComplete";
import { useForm } from "react-hook-form";
import { createSurvey } from "../../../services/api/surveyAxios";
import classes from "./CreateSurvey.module.css";
import { useUser } from "../../../contexts/UserContext";

const surveyTypes = ["Student", "Preceptor", "Graduate", "External"];

const defaultValues = {
  name: "",
  description: "",
  type: null,
};

const CreateSurvey = ({ closeModal, refetchSurveys }) => {
  const { control, handleSubmit, reset } = useForm({ defaultValues });
  const { user } = useUser();

  const handleCreateSurvey = async (data) => {
    try {
      const newSurvey = { ...data, userId: user.userId };
      await createSurvey(newSurvey);
      reset(defaultValues);
      closeModal();
      refetchSurveys(false);
    } catch {}
  };

  return (
    <>
      <Heading>Create Survey</Heading>
      <form
        onSubmit={handleSubmit(handleCreateSurvey)}
        className={classes.form}
      >
        <Input
          name="name"
          label="Name"
          placeholder="Enter a name"
          control={control}
          fullWidth
        />
        <Input
          name="description"
          label="Description"
          placeholder="Enter a description"
          control={control}
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
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateSurvey;
