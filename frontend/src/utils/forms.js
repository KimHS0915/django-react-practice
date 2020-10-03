function parseErrorMessage(fieldsErrorMessages) {
    return Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
        acc[fieldName] = {
            validateStatus: "error",
            help: errors.join(" "),
        }
        return acc;
    }, {});
}

export default parseErrorMessage;