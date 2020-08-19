function formatDate(timestamp) {
  let currentTime = new Date().getTime();
  let diffMs = currentTime - timestamp;
  let diffS = diffMs / 1000;
  let diffM = diffMs / 60000;
  let diffH = diffMs / 3600000;
  let diffD = diffMs / 86400000;
  let diffMo = diffMs / 2629800000;
  let diffY = diffMs / 31557600000;
  let result = "";

  if (diffY >= 1) {
    let tempMo = diffMo % 12;

    diffY < 2
      ? (result = Math.floor(diffY) + " yr ")
      : (result = Math.floor(diffY) + " yrs ");

    if (Number(tempMo.toFixed(0)) === 0) {
      result += " ago";
    } else {
      tempMo < 2
        ? (result += tempMo.toFixed(0) + " mth ago")
        : (result += tempMo.toFixed(0) + " mths ago");
    }
  } else {
    if (diffMo > 1 && diffMo < 12) {
      Number(diffMo.toFixed(0)) < 2
        ? (result = diffMo.toFixed(0) + " mth ")
        : (result = diffMo.toFixed(0) + " mths ");
      let tempD = diffD % 31;
      Number(tempD.toFixed(0)) < 2
        ? (result += tempD.toFixed(0) + " day ago")
        : (result += tempD.toFixed(0) + " days ago");
    } else {
      // assumming 1 month = 31 days;
      if (diffD > 1 && diffD < 31) {
        diffD < 2
          ? (result = diffD.toFixed(0) + " day ")
          : (result = diffD.toFixed(0) + " days ");
        let tempH = diffH % 24;
        tempH < 2
          ? (result += tempH.toFixed(0) + " hr ago")
          : (result += tempH.toFixed(0) + " hrs ago");
      } else {
        if (diffH > 1 && diffH < 24) {
          diffH < 2
            ? (result = diffH.toFixed(0) + " hr ")
            : (result = diffH.toFixed(0) + " hrs ");
          let tempM = diffM % 60;
          tempM < 2
            ? (result += Math.floor(tempM) + " min ago")
            : (result += tempM.toFixed(0) + " mins ago");
        } else {
          if (diffM > 0 && diffM < 1) {
            let tempS = diffS % 1000;
            diffS < 1
              ? (result = Math.ceil(tempS) + " second ago")
              : (result = tempS.toFixed(0) + " seconds ago");
          } else {
            diffM > 0 && diffM < 1.99
              ? (result = Math.floor(diffM) + " min ago")
              : (result = diffM.toFixed(0) + " mins ago");
          }
        }
      }
    }
  }
  return result;
}

export default formatDate;
