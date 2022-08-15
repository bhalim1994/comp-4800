import { useEffect } from "react";

const SURVEY_KEY = "surveys_bcit_bsn";

const useSurveys = () => {
  useEffect(() => {
    if (!_getValue()) {
      _setValue(JSON.stringify([]));
    }
  }, []);

  const submit = (surveyId) => {
    _setValue(_getModel(surveyId));
  };

  const checkSubmit = (surveyId) => {
    const arr = _getValue();
    return arr.find(({ id }) => id === surveyId);
  };

  return { submit, checkSubmit };
};

export default useSurveys;

///// Helpers
function _getModel(surveyId) {
  return JSON.stringify([..._getValue(), { id: surveyId, time: new Date() }]);
}

function _getValue() {
  return JSON.parse(localStorage.getItem(SURVEY_KEY));
}

function _setValue(val) {
  localStorage.setItem(SURVEY_KEY, val);
}
