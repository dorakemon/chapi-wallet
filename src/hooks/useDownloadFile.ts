/**
 * Custom hook for downloaf file
 *
 * @link https://theroadtoenterprise.com/blog/how-to-download-csv-and-json-files-in-react
 */
export const useDownloadFile = () => {
  const downloadFile = (props: {
    filename: string;
    content: string;
    fileType: string;
  }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([props.content], { type: props.fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = props.filename;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  return { downloadFile };
};
