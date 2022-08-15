import { Button } from "@mui/material";
import { Box } from "@mui/system";
import classes from "../ManageChoices/ManageChoices.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../../../controls/Input";
import SubHeading from "../../../UI/typography/SubHeading";
import Card from "../../../UI/Card/Card";
import CategoriesTable from "./CategoriesTable";
import { updateQuestion } from "../../../../services/api/questionAxios";

const schema = yup
  .object({
    category: yup.string().required(),
  })
  .required();

const defaultValues = {
  category: "",
};

const ManageCategories = ({ question, parsedDescription, fetchQuestion }) => {
  const {
    control,
    handleSubmit,
    reset: resetCategoryForm,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const description = parsedDescription[0];
  const matrixCategories = parsedDescription.filter(
    (val, index) => index !== 0
  );

  const handleAddCategory = async (data) => {
    const { category } = data;
    const categoriesClone = [...matrixCategories];
    categoriesClone.push(category);

    // Add main question title back to the description
    categoriesClone.unshift(description);

    await updateQuestion(question.questionId, {
      ...question,
      description: JSON.stringify(categoriesClone),
    });
    await fetchQuestion();
    resetCategoryForm();
  };

  return (
    <Card>
      <Box className={classes.root}>
        <SubHeading>Criteria</SubHeading>
        <Box>
          <form onSubmit={handleSubmit(handleAddCategory)}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              className={classes.addChoiceContainer}
            >
              <Input
                control={control}
                name="category"
                label="Add Criteria"
                placeholder="Enter a category"
                size="small"
                fullWidth
                required={false}
              />
              <Button variant="contained" type="submit">
                Add Criteria
              </Button>
            </Box>
          </form>

          <CategoriesTable
            parsedDescription={parsedDescription}
            question={question}
            fetchQuestion={fetchQuestion}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default ManageCategories;
