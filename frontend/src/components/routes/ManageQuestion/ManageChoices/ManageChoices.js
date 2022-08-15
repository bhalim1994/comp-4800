import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { createChoice } from "../../../../services/api/choiceAxios";
import classes from "./ManageChoices.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../../../controls/Input";
import SubHeading from "../../../UI/typography/SubHeading";
import ChoiceTable from "./ChoiceTable/ChoiceTable";
import Card from "../../../UI/Card/Card";

const schema = yup
  .object({
    choiceToAdd: yup.string().required(),
  })
  .required();

const defaultValues = {
  choiceToAdd: "",
};

const ManageChoices = ({ choices, fetchChoices, question }) => {
  const {
    control,
    handleSubmit,
    reset: resetChoiceForm,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleAddChoice = async (data) => {
    const choice = {
      value: data.choiceToAdd,
      questionId: question.questionId,
    };
    await createChoice(choice);
    await fetchChoices();
    resetChoiceForm();
  };

  return (
    <Card>
      <Box className={classes.root}>
        <SubHeading>Choices</SubHeading>
        <Box>
          <form onSubmit={handleSubmit(handleAddChoice)}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              className={classes.addChoiceContainer}
            >
              <Input
                control={control}
                name="choiceToAdd"
                label="Add Choice"
                placeholder="Enter a choice"
                size="small"
                fullWidth
                required={false}
              />
              <Button variant="contained" type="submit">
                Add Choice
              </Button>
            </Box>
          </form>

          <ChoiceTable
            choices={choices}
            fetchChoices={fetchChoices}
            question={question}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default ManageChoices;
