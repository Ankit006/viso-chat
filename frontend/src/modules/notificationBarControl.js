export function errorBarControl(setError, message) {
  setError({ type: "errorBar-show", message });
  setTimeout(() => {
    setError({ type: "", message });
  }, 1500);
}

export function successBarControl(setSuccess, message) {
  setSuccess({ type: "successBar-show", message });
  setTimeout(() => {
    setSuccess({ type: "", message });
  }, 1500);
}
