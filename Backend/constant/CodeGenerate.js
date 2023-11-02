export function generateEmployerCode(
  workspaceName,
  workspaceCode,
  employerName,
  _id
) {
  // Remove spaces and convert names to lowercase
  const cleanWorkspaceName = workspaceName.replace(/\s/g, "").toLowerCase();
  const cleanEmployerName = employerName.replace(/\s/g, "").toLowerCase();

  // Combine elements and generate a hash
  const combinedString =
    cleanWorkspaceName + workspaceCode + cleanEmployerName + _id;
  const hash = combinedString.split("").reduce((acc, char) => {
    const charCode = char.charCodeAt(0);
    return (acc << 5) - acc + charCode;
  }, 0);

  // Convert the hash to a string and take first 8 characters
  const code = Math.abs(hash).toString(36).slice(0, 8);
  return code;
}
