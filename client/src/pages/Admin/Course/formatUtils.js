import moment from "moment";

export const formatDate = (dateString) => {
  return dateString ? moment(dateString).format("MMM D, YYYY") : "N/A";
};

export const formatTime = (timeString) => {
  return timeString ? moment(timeString, "HH:mm").format("h:mm A") : "N/A";
};
