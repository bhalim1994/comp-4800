import moment from "moment";

export const SUBMISSION_UNIQUE_ID = "submissionId";

export const SUBMISSION_HEADERS = [
  {
    name: "#",
    source: "count",
  },
  {
    name: "Submitted At",
    source: "createdAt",
    formatter: (val) => moment(val).format("MMM D YYYY, h:mm a"),
  },
];
