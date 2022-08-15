import { TYPES } from "./Question";

export const ACTIONS = {
  INITIALIZE: "Initialization",
  UPDATE: "Update",
  UPDATE_ALL: "UpdateAll",
};

export function questionsReducer(params, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.INITIALIZE:
      return _getInitModel(payload);
    case ACTIONS.UPDATE:
      return _getUpdateModel(params, payload);
    case ACTIONS.UPDATE_ALL:
      return _getUpdateAllModel(payload);
    default:
      return params;
  }
}

////// helpers
function _getInitModel(questions) {
  return questions.map(
    ({ questionId, answerType, required, description, order }) => ({
      questionId,
      answerType,
      required,
      description,
      order,
      choiceId: undefined,
      choiceIdList: answerType === TYPES.MS ? [] : undefined,
      value: answerType === TYPES.MS ? [] : "",
    })
  );
}

function _getUpdateModel(params, payload) {
  return params.map((q) =>
    q.questionId === payload.questionId ? { ...q, ...payload } : q
  );
}

function _getUpdateAllModel(payload) {
  return payload;
}
