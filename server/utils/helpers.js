function getQuotedString(str) {
    const regex = /"([^"]*)"/;
    const match = regex.exec(str);
    return match ? match[1] : null;
};

module.exports = getQuotedString;