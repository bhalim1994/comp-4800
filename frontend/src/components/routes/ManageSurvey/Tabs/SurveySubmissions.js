import classes from "../ManageSurvey.module.css";
import surveySubmissionClasses from "./SurveySubmissions.module.css";
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import AppLoader from "../../../UI/loading/AppLoader/AppLoader";
import Table from "../../../UI/Table/Table";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  SUBMISSION_UNIQUE_ID,
  SUBMISSION_HEADERS,
} from "../surveySubmissionsHS";
import Button from "../../../UI/Button";
import { useForm } from "react-hook-form";
import SubHeading from "../../../UI/typography/SubHeading";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { exportFilter } from "../../../../services/api/reportAxios";

const defaultValues = {
  name: "",
  description: "",
  type: null,
};

// Term start months
const fallTermStart = 11; // November = 11
const winterTermStart = 3; // March = 3
const springTermStart = 6; // June = 6
// Term end months
const fallTermEnd = 1; // January = 1
const winterTermEnd = 5; // May = 5
const springTermEnd = 8; // August = 8

const SurveySubmissions = ({ surveyId }) => {
  const { handleSubmit } = useForm({ defaultValues });

  const [termStart, setTermStart] = useState("");
  const [yearStart, setYearStart] = useState("");
  const [termEnd, setTermEnd] = useState("");
  const [yearEnd, setYearEnd] = useState("");

  const [filteredSubmissions, setFilteredSubmissions] = useState([]);

  const navigate = useNavigate();
  const { response: survey } = useAxiosGet(`/surveys/${surveyId}`);
  const { response: submissions, isLoading } = useAxiosGet(
    `/submissions?surveyId=${surveyId}`
  );

  var startDateFilter = yearStart + "-" + termStart + "-01";
  var endDateFilter = yearEnd + "-" + termEnd + "-01";

  useEffect(() => {
    setFilteredSubmissions(
      submissions.map((s, index) => ({
        ...s,
        count: submissions.length - index,
      }))
    );
  }, [submissions]);

  const handleSubmissionClick = (submissionId) => {
    navigate(`/surveys/${surveyId}/submissions/${submissionId}`);
  };

  const exportAll = () => {
    if (submissions.length === 0) {
      toast.error("There are no submissions to export!");
    } else {
      exportFilter(surveyId)
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `${survey.name}_report.xlsx`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => toast.error("Something went wrong!"));
    }
  };

  const exportWithFilters = () => {
    if (
      termStart === "" ||
      yearStart.trim() === "" ||
      termEnd === "" ||
      yearEnd.trim() === ""
    ) {
      toast.error("Please fill in all the filtering fields!");
    } else if (
      Number(yearStart) > Number(yearEnd) ||
      (yearStart === yearEnd &&
        termStart === winterTermStart &&
        termEnd === fallTermEnd) ||
      (yearStart === yearEnd &&
        termStart === springTermStart &&
        (termEnd === winterTermEnd || termEnd === fallTermEnd))
    ) {
      toast.error(
        "Your starting date cannot be more recent than your ending date!"
      );
    } else if (
      submissions.filter(
        (submission) =>
          new Date(submission.createdAt.slice(0, 10)) >=
            new Date(startDateFilter) &&
          new Date(submission.createdAt.slice(0, 10)) <= new Date(endDateFilter)
      ).length === 0
    ) {
      toast.error("There are no submissions to export!");
    } else {
      exportFilter(surveyId, startDateFilter, endDateFilter)
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `${survey.name}_filtered_report.xlsx`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => toast.error("Something went wrong!"));
    }
  };

  const handleTermStartChange = (event) => {
    setTermStart(event.target.value);
  };

  const verifyYearStartInput = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setYearStart(result);
  };

  const handleTermEndChange = (event) => {
    setTermEnd(event.target.value);
  };

  const verifyYearEndInput = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setYearEnd(result);
  };

  const handleFilterSubmissions = () => {
    if (
      termStart === "" ||
      yearStart.trim() === "" ||
      termEnd === "" ||
      yearEnd.trim() === ""
    ) {
      toast.error("Please fill in all the filtering fields!");
    } else if (
      Number(yearStart) > Number(yearEnd) ||
      (yearStart === yearEnd &&
        termStart === winterTermStart &&
        termEnd === fallTermEnd) ||
      (yearStart === yearEnd &&
        termStart === springTermStart &&
        (termEnd === winterTermEnd || termEnd === fallTermEnd))
    ) {
      toast.error(
        "Your starting date cannot be more recent than your ending date!"
      );
    } else {
      setFilteredSubmissions(
        submissions
          .filter(
            (submission) =>
              new Date(submission.createdAt.slice(0, 10)) >=
                new Date(startDateFilter) &&
              new Date(submission.createdAt.slice(0, 10)) <=
                new Date(endDateFilter)
          )
          .map((s, index) => ({
            ...s,
            count: submissions.length - index,
          }))
      );
    }
  };

  const handleReset = () => {
    setTermStart("");
    setYearStart("");
    setTermEnd("");
    setYearEnd("");

    setFilteredSubmissions(
      submissions.map((s, index) => ({
        ...s,
        count: submissions.length - index,
      }))
    );
  };

  if (isLoading) return <AppLoader />;
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={surveySubmissionClasses.submissionTools}
      >
        <Box>
          <form
            onSubmit={handleSubmit(handleFilterSubmissions)}
            className={surveySubmissionClasses.submissionsFilterForm}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Term</InputLabel>
              <Select
                name="termStart"
                label="TermStart"
                value={termStart}
                onChange={handleTermStartChange}
              >
                {/* November = 11, March = 3, June = 6 */}
                <MenuItem value={fallTermStart}>Fall</MenuItem>
                <MenuItem value={winterTermStart}>Winter</MenuItem>
                <MenuItem value={springTermStart}>Spring</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="yearStart"
              label="YYYY (Starting Year)"
              value={yearStart}
              onChange={verifyYearStartInput}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 4,
              }}
            />
            <SubHeading gutterBottom sx={{ mb: 0 }}>
              -
            </SubHeading>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Term</InputLabel>
              <Select
                name="termEnd"
                label="TermEnd"
                value={termEnd}
                onChange={handleTermEndChange}
              >
                {/* January = 1, May = 5, August = 8*/}
                <MenuItem value={fallTermEnd}>Fall</MenuItem>
                <MenuItem value={winterTermEnd}>Winter</MenuItem>
                <MenuItem value={springTermEnd}>Spring</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="yearEnd"
              label="YYYY (Ending Year)"
              value={yearEnd}
              onChange={verifyYearEndInput}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 4,
              }}
            />
            <Button variant="contained" type="submit">
              Filter Submissions
            </Button>
            <Button variant="contained" type="button" onClick={handleReset}>
              Reset Filters
            </Button>
          </form>
        </Box>
        <Box>
          <PopupState variant="popover">
            {(popupState) => (
              <React.Fragment>
                <Button
                  endIcon={<KeyboardArrowDownIcon />}
                  variant="contained"
                  style={{ marginLeft: 8 }}
                  className={surveySubmissionClasses.exportToExcelButton}
                  {...bindTrigger(popupState)}
                >
                  Export to Excel
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      exportAll();
                    }}
                  >
                    <FileDownloadIcon sx={{ mr: 1, width: 20, height: 20 }} />
                    Export All
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      exportWithFilters();
                    }}
                  >
                    <FileDownloadIcon sx={{ mr: 1, width: 20, height: 20 }} />
                    Export With Filters
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </Box>
      </Box>

      {!survey.active && (
        <Alert severity="warning">
          This survey is currently closed. No further submissions can be made to
          this survey.
        </Alert>
      )}

      <Table
        data={filteredSubmissions}
        headers={SUBMISSION_HEADERS}
        uniqueIdSrc={SUBMISSION_UNIQUE_ID}
        onClick={handleSubmissionClick}
        className={classes.questionsTable}
      />
    </Box>
  );
};

export default SurveySubmissions;
