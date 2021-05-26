// js doc

/**
 * 
 * @param {object} payload the key of this object should be the column name, the values should be actual record value
 * @returns {String} 
 */
 function generateSetQuery(payload) {
    if(!(payload instanceof Object)){
        throw new Error("Payload should be Object.")
    }
      const a = Object.keys(payload)
            .filter((key) =>payload[key]!=="")
            .map((fieldName) => `${fieldName} = ?`)
            .join(', ');
            console.log(a);
            return a;
}


module.exports = {
    generateSetQuery,
}